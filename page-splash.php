<?php
  /* Template Name: Splash */
?>

<?php get_header(); ?>

  <main class="main">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post();

          if (has_post_thumbnail()) :
            $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full');
            echo '<div class="splash" style="background-image: url(' . esc_url($featured_img_url) . ');"></div>';
          endif;

      endwhile; ?>

    <?php else : ?>

      <?php get_template_part('inc/gone'); ?>

    <?php endif; ?>

  </main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
