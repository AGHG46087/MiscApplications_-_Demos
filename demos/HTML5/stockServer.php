<?php


$conn = create_connection('localhost',12345);
$arr_sockets = array($conn);
$handshake = false;

while (true)
{
  $changed = $arr_sockets;
  socket_select($changed,$write=NULL,$except=NULL,NULL);
  foreach($changed as $socket)
  {
    console($socket . " and " . $conn);
    if($socket == $conn)
    {
      $connection=socket_accept($conn);
      if($connection)
      {
        array_push($arr_sockets,$connection);				
      }
    } else {
      $bytes = @socket_recv($socket,$buffer,2048,0);
      if(!$handshake)
      {
        console("handshaking");
        dohandshake($socket,$buffer);
        sendStockData($socket);
      }
    }
  }
}

function create_connection($host,$port)
 {
   $socket = socket_create(AF_INET,SOCK_STREAM,SOL_TCP);
	
   if (!is_resource($socket)) {
     console( 'Unable to create socket: '. socket_strerror(socket_last_error()) . PHP_EOL);
   } else {
     console( "Socket created.");
   }
	
   if (!socket_set_option($socket, SOL_SOCKET, SO_REUSEADDR, 1)) {
     console( 'Unable to set option on socket: '. socket_strerror(socket_last_error()) . PHP_EOL);
   } else {
     console( "Set options on socket.");
   }
	
   if (!socket_bind($socket, $host, $port)) {
     console( 'Unable to bind socket: '. socket_strerror(socket_last_error()) . PHP_EOL);
   } else {
     console( "Socket bound to port $port.");
   }
	
   if (!socket_listen($socket,SOMAXCONN)) {
     console( 'Unable to listen on socket: ' . socket_strerror(socket_last_error()) );
   } else {
     console( "Listening on the socket.");
   }
   socket_set_nonblock($socket);
   return $socket;
 }	

function dohandshake($socket,$buffer){
      list($resource, $headers, $securityCode) = handleRequestHeader($buffer);

      console('Handshaking...');
      console('Sec-WebSocket-Key1=['.$headers['Sec-WebSocket-Key1'].']');
      console('Sec-WebSocket-Key2=['.$headers['Sec-WebSocket-Key2'].']');
      console('SecurityCode=[xxxxxxxxx]');
      $securityResponse = '';
      if (isset($headers['Sec-WebSocket-Key1']) && isset($headers['Sec-WebSocket-Key2'])) {
        $securityResponse = getHandshakeSecurityKey($headers['Sec-WebSocket-Key1'],
                                                    $headers['Sec-WebSocket-Key2'], $securityCode);
      }
        
      if ($securityResponse) {
        $upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
            "Upgrade: WebSocket\r\n" .
            "Connection: Upgrade\r\n" .
            "Sec-WebSocket-Origin: " . $headers['Origin'] . "\r\n" .
            "Sec-WebSocket-Location: ws://" . $headers['Host'] . $resource . "\r\n" .
            "\r\n".$securityResponse;        
      } else {
        $upgrade  = "HTTP/1.1 101 Web Socket Protocol Handshake\r\n" .
            "Upgrade: WebSocket\r\n" .
            "Connection: Upgrade\r\n" .
            "WebSocket-Origin: " . $headers['Origin'] . "\r\n" .
            "WebSocket-Location: ws://" . $headers['Host'] . $resource . "\r\n" .
            "\r\n";        
      }
        
      $msg = $upgrade.chr(0);
      console("Sending Upgrade Headers and Security Response");
      @socket_write($socket, $msg, strlen($msg));

      global $handshake;
//      $this->handshakes[$socket_index] = true;
      $handshake = true;
      console('Done handshaking...');
      return true;
  
}

function handleSecurityKey($key) {
  console("\thandleSecurityKey");
  preg_match_all('/[0-9]/', $key, $number);
  preg_match_all('/ /', $key, $space);
  if ($number && $space) {
    return implode('', $number[0]) / count($space[0]);
  }
  return '';
} 

function getHandshakeSecurityKey($key1, $key2, $code) {
  console("\tgetHandshakeSecurityKey");
  return md5( pack('N', handleSecurityKey($key1)).
              pack('N', handleSecurityKey($key2)).
              $code,
              true );
}    
function handleRequestHeader($request) {
  console("\tHandling Request Header");
  $resource = $code = null;
  preg_match('/GET (.*?) HTTP/', $request, $match) && $resource = $match[1];
  preg_match("/\r\n(.*?)\$/", $request, $match) && $code = $match[1];
  $headers = array();
  foreach(explode("\r\n", $request) as $line) {
    if (strpos($line, ': ') !== false) {
      list($key, $value) = explode(': ', $line);
      $headers[trim($key)] = trim($value);
    }
  }
  return array($resource, $headers, $code);
}

function disconnect($socket){
    socket_close($socket);
    console($socket." DISCONNECTED!");
    die();
  }

function sendStockData($socket)
 {
   console($socket);
   $stock_price = rand(20,32);	
   while(true)
   {
     socket_write($socket,chr(0).$stock_price.chr(255),strlen(chr(0).$stock_price.chr(255)));
     console("sent: StockPrice=[".$stock_price."]");
     sleep(1);

       // Generate a random number that will represent how much our stock price
       // will change and then make that number a decimal and attach it to the 
       // previous price.
     $stock_offset = rand(-50,50);
     $stock_price = $stock_price + ($stock_offset/100);
     $buffer = '';
     $bytes = @socket_recv($socket,$buffer,2048,0);
     if ( $bytes > 0 ) {
       console("bytes=[".$bytes."], buffer=[".$buffer."]");
       if(stristr($buffer, 'close') == TRUE ) {
         disconnect($socket);
         return;
       }
     }
   }

 }
function logMessage($msg,$type='System')
 {
   $msg = explode("\n",$msg);
   foreach( $msg as $line )
       echo date('Y-m-d H:i:s') . " {$type}: {$line}\n";
 }
function console($msg,$type='WebSocket')
 {
   logMessage($msg,$type);
 }

?>