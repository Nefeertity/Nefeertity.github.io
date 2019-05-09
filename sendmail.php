<?php

// Email address verification
function isEmail($email) {
    return(preg_match("/^[-_.[:alnum:]]+@((([[:alnum:]]|[[:alnum:]][[:alnum:]-]*[[:alnum:]])\.)+(ad|ae|aero|af|ag|ai|al|am|an|ao|aq|ar|arpa|as|at|au|aw|az|ba|bb|bd|be|bf|bg|bh|bi|biz|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|com|coop|cr|cs|cu|cv|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|in|info|int|io|iq|ir|is|it|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|mg|mh|mil|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|name|nc|ne|net|nf|ng|ni|nl|no|np|nr|nt|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|pro|ps|pt|pw|py|qa|re|ro|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|um|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)$|(([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5])\.){3}([0-9][0-9]?|[0-1][0-9][0-9]|[2][0-4][0-9]|[2][5][0-5]))$/i", $email));
}


if($_POST) {

    require('correo/class.phpmailer.php');
    require('correo/class.smtp.php');
    // $body = file_get_contents('correo/correoPlanes.html');
    $mail = new PHPMailer();
    $mail->IsSMTP(); 
    $mail->Host = 'smtp.gmail.com';
    $mail->From = 'y3ssic454@gmail.com';
    $mail->Port = 587;
    $mail->FromName = 'Página Web';
    $mail->SMTPSecure = 'tls';
    

    $clientName = $_POST['name'];
    $clientEmail = trim($_POST['email']);
    $messageCliente = $_POST['message'];
    $array = array();
    $array['error'] = 0;
    if (isset($_POST['tipo'])) {
        $organizacion = $_POST['organizacion'];
        $nombreProyec = $_POST['nombreProyec'];
        $telefono = trim($_POST['telefono']);
        $rif = trim($_POST['rif']);
        $tipo = trim($_POST['tipo']);
        $mail->Subject = 'Nuevo Proyecto Nivel: '.trim($_POST['tipo']);
        ob_start();
        require_once 'correo/correoPlanes.html';
        $body = ob_get_clean();
    }else{
        $mail->Subject = trim($_POST['subject']); 
        $array['nameMessage'] = '';
        $array['emailMessage'] = '';
        $array['messageMessage'] = '';

        $body = $messageCliente;

        if($clientName == '') {
            $array['respuesta'] = 'WS002';
            $array['error'] = 1;
            $array['nameMessage'] = 'Por favor Introduzca su nombre.';
        }
        if(!isEmail($clientEmail)) {    
            $array['respuesta'] = 'WS002';
            $array['error'] = 1;
            $array['emailMessage'] = 'Por favor Introduzca una dirección de email valida.';
        }
        if($messageCliente == '') {
            $array['respuesta'] = 'WS002';
            $array['error'] = 1;
            $array['messageMessage'] = 'Por favor Ingrese un mensaje.';
        }
    }
    if ($array['error'] == 0) {
        # code...
        $mail->MsgHTML($body);
        $mail->AddAddress('y3ssic454@gmail.com', 'servicios');
        // si el SMTP necesita autenticación
        $mail->SMTPAuth = true;

        // credenciales usuario
        $mail->Username = 'y3ssic454@gmail.com';
        $mail->Password = 'oneegesrtvncjmux'; 

        if(!$mail->Send()) {
            $array['respuesta']= 'Error enviando: ' . $mail->ErrorInfo;
        } else {
            $array['respuesta']='WS001';
        }
    }




 //    // Enter the email where you want to receive the message
 //    $emailTo = 'y3ssic454@gmail.com';
 //    $clientName = $_POST['name'];
 //    $clientEmail = trim($_POST['email']);
 //    $messageCliente = $_POST['message'];
 //    $array = array();
 //     $array['error'] = 0;

 //    if (isset($_POST['tipo'])) {

 //        $organizacion = $_POST['organizacion'];
 //        $nombreProyec = $_POST['nombreProyec'];
 //        $telefono = trim($_POST['telefono']);
 //        $rif = trim($_POST['rif']);
 //        $tipo = trim($_POST['tipo']);
 //        $subject = 'Nuevo Proyecto Nivel: '.trim($_POST['tipo']);
 //        ob_start();
 //        require_once 'correo/correoPlanes.html';
 //        $message = ob_get_clean();
 //    }else{
 //        $subject = trim($_POST['subject']); 
 //        $array['nameMessage'] = '';
 //        $array['emailMessage'] = '';
 //        $array['messageMessage'] = '';

 //        $message = $messageCliente;

 //        if($clientName == '') {
 //            $array['respuesta'] = 'WS002';
 //            $array['error'] = 1;
 //            $array['nameMessage'] = 'Por favor Introduzca su nombre.';
 //        }
 //        if(!isEmail($clientEmail)) {    
 //            $array['respuesta'] = 'WS002';
 //            $array['error'] = 1;
 //            $array['emailMessage'] = 'Por favor Introduzca una dirección de email valida.';
 //        }
 //        if($messageCliente == '') {
 //            $array['respuesta'] = 'WS002';
 //            $array['error'] = 1;
 //            $array['messageMessage'] = 'Por favor Ingrese un mensaje.';
 //        }
 //    }

 //    if($array['error'] == 0) {
    
 //    // Cabecera que especifica que es un HMTL
    
	// $headers  = "From: " . $clientName . " <" . $clientEmail . ">" . "\r\n" . "Reply-To: " . $clientEmail;
 //    // $headers .= 'MIME-Version: 1.0' . "\r\n";
 //    // $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 //        try {
 //            if (mail($emailTo, $subject, $message, $headers)) {
 //                $array['respuesta'] = 'WS001';
 //            }else{
 //                $array['respuesta'] = "emailTo=".$emailTo."subject=".$subject."mensaje=".$message."headers=".$headers;
 //            }
 //        } catch (Exception $e) {
 //             $array['respuesta'] = 'WS003';
 //        }
 //    }

    echo json_encode($array);

}

?>
