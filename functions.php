<?php

if (!defined('ABSPATH')) exit;

/*------------------------------------*\
	Functions
\*------------------------------------*/

// Set up theme support
function shapeSpace_setup()
{
  add_theme_support('post-thumbnails');
  add_theme_support('automatic-feed-links');
  add_theme_support('title-tag');
}

// Load Blank scripts (header.php)
function blank_header_scripts()
{
  if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
    wp_deregister_script('wp-embed'); // Remove wp-embed
    wp_deregister_script('jquery'); // Remove jQuery

  }
}

// Load Blank scripts (footer.php)
function blank_footer_scripts()
{
  if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
    wp_register_script('rob-tucker', get_template_directory_uri() . '/script.js', array(), '1.0.0', true); // Custom scripts
    wp_enqueue_script('rob-tucker'); // Enqueue it!
  }
}

// Load Blank styles
function blank_styles()
{
  wp_register_style('rob-tucker', get_template_directory_uri() . '/style.css', array(), '1.0.0', 'all');
  wp_enqueue_style('rob-tucker'); // Enqueue it!
}

// Remove the <div> surrounding the dynamic navigation to cleanup markup
function my_wp_nav_menu_args($args = '')
{
  $args['container'] = false;
  return $args;
}

// Add page slug to body class, love this - Credit: Starkers Wordpress Theme
function add_slug_to_body_class($classes)
{
  global $post;
  if (is_home()) {
    $key = array_search('blog', $classes);
    if ($key > -1) {
      unset($classes[$key]);
    }
  } elseif (is_page()) {
    $classes[] = sanitize_html_class($post->post_name);
  } elseif (is_singular()) {
    $classes[] = sanitize_html_class($post->post_name);
  }

  return $classes;
}

// If Dynamic Sidebar Exists
if (function_exists('register_sidebar'))
{
  // Define Menu Widget Area
  register_sidebar(array(
    'name' => __('Widgets Menu', 'rob-tucker'),
    'description' => __('Widgets added here are displayed in the menu', 'rob-tucker'),
    'id' => 'widgets_menu',
    'before_widget' => '<div id="%1$s" class="%2$s">',
    'after_widget' => '</div>',
    'before_title' => '<h3>',
    'after_title' => '</h3>'
  ));

  // Define Sidebar Widget Area
  register_sidebar(array(
    'name' => __('Widgets Sidebar', 'rob-tucker'),
    'description' => __('Widgets added here are displayed in the sidebar', 'rob-tucker'),
    'id' => 'widgets_sidebar',
    'before_widget' => '<div id="%1$s" class="%2$s">',
    'after_widget' => '</div>',
    'before_title' => '<h3>',
    'after_title' => '</h3>'
  ));
}

// Remove wp_head() injected Recent Comment styles
function my_remove_recent_comments_style()
{
  global $wp_widget_factory;
  remove_action('wp_head', array(
    $wp_widget_factory->widgets['WP_Widget_Recent_Comments'],
    'recent_comments_style'
  ));
}

// Remove Admin bar
function remove_admin_bar()
{
  return false;
}

/*------------------------------------*\
	Actions + Filters + ShortCodes
\*------------------------------------*/

// Add Actions
add_action('init', 'blank_header_scripts'); // Add Custom Scripts to wp_head()
add_action('init', 'blank_footer_scripts'); // Add Custom Scripts to wp_footer()
add_action('wp_enqueue_scripts', 'blank_styles'); // Add Theme Stylesheet
add_action('widgets_init', 'my_remove_recent_comments_style'); // Remove inline Recent Comment Styles from wp_head()
add_action('after_setup_theme', 'shapeSpace_setup'); // Add theme support setup

// Remove Actions
remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file
remove_action('wp_head', 'index_rel_link'); // Index link
remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current post
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);
remove_action('wp_head', 'print_emoji_detection_script', 7); // Remove emoji scripts
remove_action('wp_print_styles', 'print_emoji_styles'); // Remove emoji styles

// Add Filters
add_filter('body_class', 'add_slug_to_body_class'); // Add slug to body class (Starkers build)
add_filter('show_admin_bar', 'remove_admin_bar'); // Remove Admin bar
