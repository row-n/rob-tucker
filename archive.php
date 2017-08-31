<?php get_header(); ?>

  <?php if (have_posts()) : ?>

    <?php if (is_category()) { ?>

      <h2><?php _e('Archive for the', 'rob-tucker'); ?> &#8216;<?php single_cat_title(); ?>&#8217; <?php _e('Category', 'rob-tucker'); ?></h2>

    <?php } elseif(is_tag()) { ?>

      <h2><?php _e('Posts Tagged', 'rob-tucker'); ?> &#8216;<?php single_tag_title(); ?>&#8217;</h2>

    <?php } elseif (is_day()) { ?>

      <h2><?php _e('Archive for', 'rob-tucker'); ?> <?php the_time('F jS, Y'); ?></h2>

    <?php } elseif (is_month()) { ?>

      <h2><?php _e('Archive for', 'rob-tucker'); ?> <?php the_time('F, Y'); ?></h2>

    <?php } elseif (is_year()) { ?>

      <h2><?php _e('Archive for', 'rob-tucker'); ?> <?php the_time('Y'); ?></h2>

    <?php } elseif (is_author()) { ?>

      <h2><?php _e('Author Archive for', 'rob-tucker'); ?> <?php the_post(); echo get_the_author(); rewind_posts(); ?></h2>

    <?php } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>

      <h2><?php _e('Blog Archives', 'rob-tucker'); ?></h2>

    <?php } ?>

    <?php get_template_part('inc/nav'); ?>

    <?php while (have_posts()) : the_post(); ?>

      <div id="post-<?php the_ID(); ?>" <?php post_class() ?>>

        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

        <?php get_template_part('inc/meta'); ?>

        <div class="entry">

          <?php the_excerpt(); ?>

        </div>

      </div>

    <?php endwhile; ?>

    <?php get_template_part('inc/nav'); ?>

  <?php else : ?>

    <?php get_template_part('inc/gone'); ?>

  <?php endif; ?>

<?php get_sidebar(); ?>

<?php get_footer(); ?>