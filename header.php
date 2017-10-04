<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>

    <meta charset="<?php bloginfo('charset'); ?>">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php bloginfo('description'); ?>">

    <link href="//www.google-analytics.com" rel="dns-prefetch">
    <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
    <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet">

    <?php wp_head(); ?>

  </head>
  <body class="body">

    <header id="header" class="header" role="banner">
      <div class="header__body">
        <div class="brand">
          <a href="<?php echo home_url('/'); ?>" class="brand__logo"><?php bloginfo('name'); ?><span class="brand__description"><?php bloginfo('description'); ?></span></a>
        </div>
        <button id="trigger" class="hamburger">
          Menu
          <span class="hamburger__icon">
            <span class="hamburger__line hamburger__line--1"></span>
            <span class="hamburger__line hamburger__line--2"></span>
          </span>
        </button>
      </div>

      <nav id="menu" class="menu" role="navigation">
        <?php main_nav(); ?>
      </nav>
    </header>
