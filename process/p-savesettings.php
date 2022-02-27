<?php
require($_SERVER['DOCUMENT_ROOT'].'/backend/config.php');

if(isset($_POST['save-settings'])){
  $v=$_POST;
  unset($_POST);
  $createlink=new Createlink;
  if(!empty($v['link']) && empty($v['replay'])){
    $createlink->update($v);
  }
  else{
    $createlink->insert($v);
  }
  echo $createlink->inputcode;
}
?>
