<?php

class Db{
  private $servername;
  private $username;
  private $password;
  private $dbname;
  private $charset;

  protected function connect(){
    $this->servername='localhost';
    $this->username='root';
    $this->password='root';
    $this->dbname='dash';
    $this->charset='utf8mb4';

    try{
      $dsn='mysql:host='.$this->servername.';dbname='.$this->dbname.';charset='.$this->charset;
      $pdo=new PDO($dsn, $this->username, $this->password);
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $pdo;
    }
    catch(PDOException $e){
      echo 'Connection failed: '.$e->getMessage();
    }
  }
}

include($_SERVER['DOCUMENT_ROOT'].'/head/inc.php');




?>
