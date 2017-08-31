<?php get_header(); ?>

  <div id="content">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post(); ?>

        <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

          <h1><a href="<?php the_permalink(); ?>" title="Permanent link: <?php the_title_attribute(); ?>"><?php the_title(); ?></a></h1>

          <?php get_template_part('inc/meta'); ?>

          <?php if (has_post_thumbnail()) the_post_thumbnail(); ?>

          <div class="entry">

            <?php the_content(); ?>

            <?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>

          </div>

          <div class="postmetadata">

            <?php the_tags('<p>Tags: ', ', ', '</p>'); ?>

            <p>
              <?php _e('Posted in', 'rob-tucker'); ?> <?php the_category(', '); ?> |
              <?php comments_popup_link('Leave a comment', '1 comment', '% comments', 'comments-link', 'Comments disabled'); ?>
            </p>

          </div>

        </div>

      <?php endwhile; ?>

      <?php get_template_part('inc/nav'); ?>

      <?php comments_template(); ?>

    <?php else : ?>

      <?php get_template_part('inc/gone'); ?>

    <?php endif; ?>

  </div>

<?php get_sidebar(); ?>

<?php get_footer(); ?>