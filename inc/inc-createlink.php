<?php
class Createlink extends Db{
  public function createUniqueId(){
    $str = "";
  	$characters = array_merge(range('A','Z'), range('a','z'), range('0','9'));
  	$max = count($characters) - 1;
  	for ($i = 0; $i < 10; $i++) {
  		$rand = mt_rand(0, $max);
  		$str .= $characters[$rand];
  	}
  	return $str;
  }
  public function checkLink(){
    $random=$this->createUniqueId();
    $q=$this->connect()->query("SELECT link FROM settings WHERE link='$random'");
    if($q->rowCount()){
      $this->checkLink();
    }
    else{
      $this->inputcode=$random;
    }
  }
  public $inputcode;
  public function insert($v){
    $this->checkLink();
    $q=$this->connect()->prepare("INSERT INTO settings (
      link,
      teams,
      names,
      settings,
      code,
      animated,
      img,
      luck,
      date,
      replay
    ) VALUES (
      :link,
      :teams,
      :names,
      :settings,
      :code,
      :animated,
      :img,
      :luck,
      :date,
      :replay
    )");
    if( $q->execute(array(
      ':link' => $this->inputcode,
      ':teams' => $v['teams'],
      ':names' => $v['names'],
      ':settings' => $v['settings'],
      ':code' => $v['code'],
      ':animated' => $v['animated'],
      ':img' => $v['img'],
      ':luck' => $v['luck'],
      ':date' => $v['date'],
      ':replay' => $v['replay']
    )) ){

    }
    else{
      // ERROR HANDLING NEEDED
      echo 'fail';
    }
  }
  public function update($v){
    $q=$this->connect()->prepare("UPDATE settings SET
      teams=:teams,
      names=:names,
      settings=:settings,
      code=:code,
      animated=:animated,
      img=:img,
      luck=:luck,
      date=:date
      WHERE link=:link LIMIT 1");
    $q->execute(array(
      ':teams' => $v['teams'],
      ':names' => $v['names'],
      ':settings' => $v['settings'],
      ':code' => $v['code'],
      ':animated' => $v['animated'],
      ':img' => $v['img'],
      ':luck' => $v['luck'],
      ':date' => $v['date'],
      ':link' => $v['link']
    ));
    $this->inputcode=$v['link'];
  }
  public function exists($link){
    $q=$this->connect()->prepare("SELECT * FROM settings WHERE link=? LIMIT 1");
    $q->execute([$link]);
    if($q->rowCount()){
      return true;
    }
    else{
      return false;
    }
  }
  public $id;
  public $link;
  public $teams;
  public $names;
  public $settings;
  public $date;
  public $code;
  public $animated;
  public $img;
  public $luck;
  public $replay;
  public $r;
  public function getSettings($link){
    $q=$this->connect()->prepare("SELECT * FROM settings WHERE link=? LIMIT 1");
    $q->execute([$link]);
    if($q->rowCount()){
      $r=$q->fetch();
      $this->r=$r;
      $this->id=$r['id'];
      $this->link=$r['link'];
      $this->teams=$r['teams'];
      $this->names=$r['names'];
      $this->settings=$r['settings'];
      $this->date=$r['date'];
      $this->code=$r['code'];
      $this->animated=$r['animated'];
      $this->img=$r['img'];
      $this->luck=$r['luck'];
      $this->replay=$r['replay'];
    }
  }
}

?>
