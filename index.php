<?php require($_SERVER['DOCUMENT_ROOT'].'/backend/config.php'); ?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <script async src="https://www.googletagmanager.com/gtag/js?id=UA-133064599-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-133064599-1');
  </script>

  <title>100 Yard Rush</title>
  <?php
  if(isset($_GET['v'])){
    $v=$_GET['v'];
    unset($_GET);
    $getsettings=new Createlink;
    $getsettings->getSettings($v);
    $savedsettings=json_encode($getsettings->r);
    ?>
    <script type="text/javascript">
      var settingsFromDB=<?php echo $savedsettings; ?>;
    </script>
    <?php
  }
  ?>

  <?php require($_SERVER['DOCUMENT_ROOT'].'/head/js.php'); ?>
  <?php require($_SERVER['DOCUMENT_ROOT'].'/head/css.php'); ?>
  <?php require($_SERVER['DOCUMENT_ROOT'].'/head/meta.php'); ?>

</head>

<body>

  <div class="dash-wrapper">

    <div class="settings-box" style="display:none;">
      <div class="about-toggle"><i class="material-icons mi-help-toggle">help</i></div>
      <div class="settings-about" style="display:none;">
        <div>
          <h4>About 100 Yard Rush</h4>
          <p>100 Yard Rush is a random order visualizer intended to help decide the draft order for your fantasy football league. There are two modes of Rushes to run (Random Rush and Code Rush), plus several customization options.</p>
        </div>

        <div>
          <h4>Random Rush</h4>
          <p>Each runner will rush between a minimum and maximum number of yards per number of seconds, and will then rush again at the end of the rush until they reach the endzone. For example, a runner could rush for 10 yards in 1 second giving them a big lead, or 1 yard in 8 seconds which will set them back.</p>
        </div>

        <div>
          <h4>Code Rush</h4>
          <p>Each runner will select a code, word, or phrase made up of a maximum of 20 letters, numbers, or characters. This code will then be converted into a series of rushes that each runner will rush.</p>
        </div>

        <div>
          <h4>Custom Images</h4>
          <p>Adding custom images will replace the rusher sprite with your linked image. Images must be a direct link to your image (URL ends in .jpg, .png, or .gif). Shorter URLs are recommended for stability. Squared 1:1 ratio images work best. Images that are later deleted will not be fixable in replays.</p>
        </div>

        <div>
          <h4>Speed</h4>
          <p>There are four speed options to choose from.</p>
          <p><span>Normal</span> - Yards and seconds per rush are standard.</p>
          <p><span>Fast</span> - Yards per rush are doubled, seconds per rush remain standard.</p>
          <p><span>Faster</span> - Yards and per rush are doubled, seconds per rush are cut in half.</p>
          <p><span>Fastest</span> - Yards per rush are tripled, seconds per rush are cut into a third.</p>
        </div>

        <div>
          <h4>Luck</h4>
          <p>The optional Luck modifier gives a 5% chance per Luck point of doubling the runner's randomly rolled rush yards each turn. This can be used to give the previous season last place manager a better chance of winning, or to give everyone a bit of Luck to mix-up the Rush!</p>
        </div>

        <div>
          <h4>Settings and Replay URLs (BETA)</h4>
          <p>You have the option to save a direct link to your saved settings before starting a Rush, and saving a shareable replay after the Rush is finished.</p>
          <p>Note: Replay mode may perform differently from one browser/computer to another. The final results will always stay the same.</p>
        </div>

        <div>
          <h4>Donate</h4>
          <p>Contact me on Twitter for questions or suggestions. If 100 Yard Rush is useful for your league, please consider donating a small amount to help upkeep server cost. Thank you!</p>
          <div class="icons-container">
            <div class="icons-wrapper">
              <a class="icon-link" target="_blank" href="http://twitter.com/kevinahmadi">
                <div class="icons icon-logo i-item-t"></div>
                <div class="icon-title">@kevinahmadi</div>
              </a>
            </div>
            <div class="icons-wrapper">
              <a class="icon-link" target="_blank" href="http://paypal.me/kevinahmadi">
                <div class="icons icon-logo i-item-pp"></div>
                <div class="icon-title">.me/kevinahmadi</div>
              </a>
            </div>
            <div class="icons-wrapper">
              <a class="icon-link" target="_blank" href="http://cash.app/$kevinahmadi">
                <div class="icons icon-logo i-item-ca"></div>
                <div class="icon-title">$kevinahmadi</div>
              </a>
            </div>
            <div class="icons-wrapper">
              <a class="icon-link" target="_blank" href="/images/3HCenbKEPNtQn5ge52KsTYDCAzRYDKDBsz.png">
                <div class="icons icon-logo i-item-bc"></div>
                <div class="icon-title">3HCenbKEPNtQn5ge52KsTYDCAzRYDKDBsz</div>
              </a>
            </div>
          </div>
        </div>

      </div>
      <div class="settings-box-container">
        <div class="settings-numteams settings-1" style="display:none;">
          <div class="settings-switch settings-teamswitch">
            <div class="settings-leader teamswitch-title">Allow non-standard team numbers?</div>
            <div class="settings-option teamswitch-option teamswitch-on">Yes</div>
            <div class="settings-option teamswitch-option teamswitch-off selected">No</div>
          </div>
          <div class="settings-title">
            <p class="settings-title2">How many teams are in your league?</p>
          </div>
          <div class="numteams-select">
            <div class="numteams-container">
              <div class="select-number hidden">1</div>
              <div class="select-number hidden">2</div>
              <div class="select-number hidden">3</div>
              <div class="select-number hidden">4</div>
              <div class="select-number hidden">5</div>
              <div class="select-number">6</div>
              <div class="select-number hidden">7</div>
              <div class="select-number">8</div>
              <div class="select-number hidden">9</div>
              <div class="select-number">10</div>
              <div class="select-number hidden">11</div>
              <div class="select-number selected">12</div>
              <div class="select-number hidden">13</div>
              <div class="select-number">14</div>
              <div class="select-number hidden">15</div>
              <div class="select-number">16</div>
              <div class="select-number hidden">17</div>
              <div class="select-number">18</div>
              <div class="select-number hidden">19</div>
              <div class="select-number">20</div>
              <div class="select-number hidden">21</div>
              <div class="select-number hidden">22</div>
              <div class="select-number hidden">23</div>
              <div class="select-number hidden">24</div>
              <div class="select-number hidden">25</div>
              <div class="select-number hidden">26</div>
              <div class="select-number hidden">27</div>
              <div class="select-number hidden">28</div>
              <div class="select-number hidden">29</div>
              <div class="select-number hidden">30</div>
              <div class="select-number hidden">31</div>
              <div class="select-number hidden">32</div>
            </div>

          </div>
          <div class="settings-navigate">
            <div class="settings-navigate">
              <div class="navigate-wrapper">
              </div>
              <div class="navigate-wrapper">
                <a href="javascript:void(0);" class="settings-next">&rarr;</a>
              </div>
            </div>
          </div>
        </div>

        <div class="settings-teamsinput settings-2">
          <div>
            <div class="settings-switch settings-spritetype">
              <div class="settings-leader spritetype-title">Sprite Type?</div>
              <div class="settings-option spritetype-option spritetype-animated selected">Animated</div>
              <div class="settings-option spritetype-option spritetype-static">Static</div>
              <div class="settings-option spritetype-option spritetype-custom">Custom</div>
            </div>
          </div>
          <div class="settings-title">
            <p class="settings-title2">Write all manager's names in the boxes below.</p>
          </div>
          <div class="teamsinput-container">


          </div>
          <div class="sprite-box-wrapper">
            <div class="sprite-select-box">
              <div class="sprite-conference">
                <div class="sprite-current" style=""></div>
                <div class="sprite-skin">
                  <div class="sprite-skin-color skin-shade1" data-skin="1"><i class="material-icons">done</i></div><div class="sprite-skin-color skin-shade2" data-skin="2"><i class="material-icons">done</i></div>
                </div>
              </div>
              <div class="sprite-conference">
                <div class="sprite-division">
                  <div class="sprite-char" data-char="3">BAL</div>
                  <div class="sprite-char" data-char="8">CLE</div>
                  <div class="sprite-char" data-char="7">CIN</div>
                  <div class="sprite-char" data-char="27">PIT</div>
                </div>
                <div class="sprite-division">
                  <div class="sprite-char" data-char="4">BUF</div>
                  <div class="sprite-char" data-char="19">MIA</div>
                  <div class="sprite-char" data-char="21">NE</div>
                  <div class="sprite-char" data-char="24">NYJ</div>
                </div>
                <div class="sprite-division">
                  <div class="sprite-char" data-char="13">HOU</div>
                  <div class="sprite-char" data-char="14">IND</div>
                  <div class="sprite-char" data-char="15">JAX</div>
                  <div class="sprite-char" data-char="31">TEN</div>
                </div>
                <div class="sprite-division">
                  <div class="sprite-char" data-char="10">DEN</div>
                  <div class="sprite-char" data-char="25">OAK</div>
                  <div class="sprite-char" data-char="16">KC</div>
                  <div class="sprite-char" data-char="17">LAC</div>
                </div>
              </div>
              <div class="sprite-conference">
                <div class="sprite-division">
                  <div class="sprite-char" data-char="6">CHI</div>
                  <div class="sprite-char" data-char="11">DET</div>
                  <div class="sprite-char" data-char="12">GB</div>
                  <div class="sprite-char" data-char="20">MIN</div>
                </div>
                <div class="sprite-division">
                  <div class="sprite-char" data-char="9">DAL</div>
                  <div class="sprite-char" data-char="23">NYG</div>
                  <div class="sprite-char" data-char="26">PHI</div>
                  <div class="sprite-char" data-char="32">WAS</div>
                </div>
                <div class="sprite-division">
                  <div class="sprite-char" data-char="2">ATL</div>
                  <div class="sprite-char" data-char="5">CAR</div>
                  <div class="sprite-char" data-char="22">NO</div>
                  <div class="sprite-char" data-char="30">TB</div>
                </div>
                <div class="sprite-division">
                  <div class="sprite-char" data-char="1">ARI</div>
                  <div class="sprite-char" data-char="18">LAR</div>
                  <div class="sprite-char" data-char="29">SEA</div>
                  <div class="sprite-char" data-char="28">SF</div>
                </div>
              </div>
            </div>
          </div>

          <div class="settings-navigate">
            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-back">&larr;</a>
            </div>
            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-next settings-style">&rarr;</a>
            </div>
          </div>
        </div>

        <div class="settings-randomize settings-3">
          <div class="settings-switch settings-shufflercode">
            <div class="settings-option shufflercode-option shufflercode-random selected">Random Rush</div>
            <div class="settings-option shufflercode-option shufflercode-code">Code Rush</div>
          </div>
          <div class="settings-shuffler">
            <div class="settings-title">
              <p class="settings-title2">Press the shuffle button below as many times as you wish for ultimate randomization.</p>
            </div>
            <div class="randomize-wrapper">
              <div class="randomize-button">
                <button class="button-random"><i class="material-icons mi-shuffle">shuffle</i></button>
              </div>
              <div class="randomize-total">
                <p class="total-tag1">Shuffled</p>
                <p class="total-shuffles">0</p>
                <p class="total-tag2">times</p>
              </div>
            </div>
          </div>
          <div class="settings-code">
            <div class="settings-title">
              <p class="settings-title2">Type or paste a word, phrase, or code into the boxes below for each manager.</p>
              <p class="settings-title5">Spaces will be removed, long codes will be reduced to 20 characters, blank codes will be randomly generated.</p>
            </div>
            <div class="code-container">

            </div>
          </div>
          <div class="settings-navigate">
            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-back settings-reverse-order">&larr;</a>
            </div>
            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-next settings-code-fill">&rarr;</a>
            </div>
          </div>
        </div>

        <div class="settings-luck settings-4">
          <div class="settings-switch settings-luckswitch">
            <div class="settings-leader luckswitch-title">Unlock luck adjustment?</div>
            <div class="settings-option luckswitch-option luckswitch-on">Yes</div>
            <div class="settings-option luckswitch-option luckswitch-off selected">No</div>
          </div>
          <div class="luck-wrapper">
            <div class="settings-title">
              <p class="settings-title2">Higher Luck values give better chances of winning.</p>

            </div>
            <div class="luck-container">

            </div>
          </div>
          <div class="settings-navigate">
            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-back">&larr;</a>
            </div>
            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-next settings-count-luck">&rarr;</a>
            </div>
          </div>
        </div>

        <div class="settings-values settings-5">
          <div class="settings-title">
            <p class="settings-title2">Yards travelled per rush.</p>
          </div>
          <div class="range">
            <div class="range-stack range-toggle">
              <div class="range-row">Min</div>
              <div class="range-row">
                <div class="range-num yards-min selected">1</div>
                <div class="range-num yards-min">2</div>
                <div class="range-num yards-min">3</div>
                <div class="range-num yards-min">4</div>
                <div class="range-num yards-min">5</div>
              </div>
            </div>
            <div class="range-stack range-toggle">
              <div class="range-row">Max</div>
              <div class="range-row">
                <div class="range-num yards-max">6</div>
                <div class="range-num yards-max">7</div>
                <div class="range-num yards-max">8</div>
                <div class="range-num yards-max">9</div>
                <div class="range-num yards-max selected">10</div>
              </div>
            </div>
          </div>
          <div class="settings-title">
            <p class="settings-title2 title-margin">Seconds per rush.</p>
          </div>
          <div class="range">
            <div class="range-stack range-toggle">
              <div class="range-row">Min</div>
              <div class="range-row">
                <div class="range-num seconds-min">1</div>
                <div class="range-num seconds-min selected">2</div>
                <div class="range-num seconds-min">3</div>
                <div class="range-num seconds-min">4</div>
              </div>
            </div>
            <div class="range-stack range-toggle">
              <div class="range-row">Max</div>
              <div class="range-row">
                <div class="range-num seconds-max">5</div>
                <div class="range-num seconds-max">6</div>
                <div class="range-num seconds-max selected">7</div>
                <div class="range-num seconds-max">8</div>
              </div>
            </div>
          </div>
          <div class="settings-title">
            <p class="settings-title2 title-margin">Speed.</p>
          </div>
          <div class="range">
            <div class="range-stack">
              <div class="range-row">
                <div class="range-num range-speed selected">Normal</div>
                <div class="range-num range-speed">Fast</div>
                <div class="range-num range-speed">Faster</div>
                <div class="range-num range-speed">Fastest</div>
              </div>
            </div>
          </div>
          <div class="settings-navigate">
            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-back">&larr;</a>
            </div>
            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-next settings-compile">&rarr;</a>
            </div>
          </div>
        </div>

        <div class="settings-start settings-6" style="display:none;">
          <div class="settings-recap">

          </div>
          <div class="settings-title">
            <p class="settings-title2">When you're ready...</p>
          </div>
          <div class="start-button">
            <button class="button-style button-start">Start Rush</button>
          </div>

          <div class="get-at-me">
            <p>Contact me on Twitter for questions or suggestions. If 100 Yard Rush is useful for your league, please consider donating a small amount to help upkeep server cost. Thank you!</p>
            <div class="icons-container">
              <div class="icons-wrapper">
                <a class="icon-link" target="_blank" href="http://twitter.com/kevinahmadi">
                  <div class="icons icon-logo i-item-t"></div>
                  <div class="icon-title">@kevinahmadi</div>
                </a>
              </div>
              <div class="icons-wrapper">
                <a class="icon-link" target="_blank" href="http://paypal.me/kevinahmadi">
                  <div class="icons icon-logo i-item-pp"></div>
                  <div class="icon-title">.me/kevinahmadi</div>
                </a>
              </div>
              <div class="icons-wrapper">
                <a class="icon-link" target="_blank" href="http://cash.app/$kevinahmadi">
                  <div class="icons icon-logo i-item-ca"></div>
                  <div class="icon-title">$kevinahmadi</div>
                </a>
              </div>
              <div class="icons-wrapper">
                <a class="icon-link" target="_blank" href="/images/3HCenbKEPNtQn5ge52KsTYDCAzRYDKDBsz.png">
                  <div class="icons icon-logo i-item-bc"></div>
                  <div class="icon-title">3HCenbKEPNtQn5ge52KsTYDCAzRYDKDBsz</div>
                </a>
              </div>
            </div>
          </div>

          <div class="settings-navigate">

            <div class="navigate-wrapper">
              <a href="javascript:void(0);" class="settings-back">&larr;</a>
            </div>
            <div class="navigate-wrapper">
            </div>
          </div>
        </div>

        <div class="settings-goodluck">
          <p class="settings-tag">Good luck!</p>
        </div>

        <div class="settings-share">
          <div class="placements">

          </div>

        </div>
      </div>
    </div>

    <div class="countdown-box">

      <div class="countdown-number countdown-3">3</div>
      <div class="countdown-number countdown-2">2</div>
      <div class="countdown-number countdown-1">1</div>

    </div>

    <div class="wrapper">
      <div class="wrapper-top">

      </div>
      <div class="wrapper-bottom">
        <div class="field-container">
          <div class="field-start"></div>
          <div class="field-center">
            <div class="p-wrapper">
              <div class="p-hold">
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-1">
                      <div class="p-name p-name0"></div>
                    </div>

                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-2">
                      <div class="p-name p-name1"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-3">
                      <div class="p-name p-name2"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-4">
                      <div class="p-name p-name3"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-5">
                      <div class="p-name p-name4"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-6">
                      <div class="p-name p-name5"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-7">
                      <div class="p-name p-name6"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-8">
                      <div class="p-name p-name7"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-9">
                      <div class="p-name p-name8"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-10">
                      <div class="p-name p-name9"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-11">
                      <div class="p-name p-name10"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
                <div class="p-container">

                  <div class="p-bar-outside">
                    <div class="p-bar p-12">
                      <div class="p-name p-name11"></div>
                    </div>
                  </div>
                  <div class="p-place-container">
                    <div class="p-place"></div>
                  </div>
                </div>
              </div>
            </div>






            <div class="field-five f-5">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-e">
                <div class="f-m2"></div>
              </div>
            </div>
            <div class="field-five f-10">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber f-rbarrow">0</div>
              <div class="f-number f-lbarrow">1</div>
            </div>
            <div class="field-five f-15">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2">1</div>
              <div class="f-number2">0</div>
            </div>
            <div class="field-five f-20">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber f-rbarrow">0</div>
              <div class="f-number f-lbarrow">2</div>
            </div>
            <div class="field-five f-25">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2">2</div>
              <div class="f-number2">0</div>
            </div>
            <div class="field-five f-30">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber f-rbarrow">0</div>
              <div class="f-number f-lbarrow">3</div>
            </div>
            <div class="field-five f-35">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2">3</div>
              <div class="f-number2">0</div>
            </div>
            <div class="field-five f-40">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber f-rbarrow">0</div>
              <div class="f-number f-lbarrow">4</div>
            </div>
            <div class="field-five f-45">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2">4</div>
              <div class="f-number2">0</div>
            </div>
            <div class="field-five f-50">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber">0</div>
              <div class="f-number">5</div>
            </div>
            <div class="field-five f-55">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2">5</div>
              <div class="f-number2">0</div>
            </div>
            <div class="field-five f-60">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber">0</div>
              <div class="f-number">4</div>
            </div>
            <div class="field-five f-65">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2 f-lbarrow">4</div>
              <div class="f-number2 f-rbarrow">0</div>
            </div>
            <div class="field-five f-70">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber">0</div>
              <div class="f-number">3</div>
            </div>
            <div class="field-five f-75">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2 f-lbarrow">3</div>
              <div class="f-number2 f-rbarrow">0</div>
            </div>
            <div class="field-five f-80">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber">0</div>
              <div class="f-number">2</div>
            </div>
            <div class="field-five f-85">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2 f-lbarrow">2</div>
              <div class="f-number2 f-rbarrow">0</div>
            </div>
            <div class="field-five f-90">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber">0</div>
              <div class="f-number">1</div>
            </div>
            <div class="field-five f-95">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-topnumber2 f-lbarrow">1</div>
              <div class="f-number2 f-rbarrow">0</div>
            </div>
            <div class="field-five f-100">
              <div class="f-marker-container-a">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-b">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-c">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-d">
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
                <div class="f-m"></div>
              </div>
              <div class="f-marker-container-e">
                <div class="f-m3"></div>
              </div>
            </div>
          </div>
          <div class="field-end"></div>
        </div>
      </div>


    </div>
  </div>

</body>
</html>
