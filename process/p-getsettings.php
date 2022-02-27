<?php
require($_SERVER['DOCUMENT_ROOT'].'/backend/config.php');

if(isset($_POST['get-settings'])){
  $v=$_POST;
  unset($_POST);
  $getsettings=new Createlink;
  $getsettings->getSettings($v);
  print_r(json_encode($getsettings->r));
}
?>
