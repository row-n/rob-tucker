<?php
  /* Template Name: Album */
?>

<?php get_header(); ?>

  <main class="main">

    <section class="content album">

      <?php if (have_posts()) : ?>

        <?php while (have_posts()) : the_post(); ?>

          <header class="container content__header">
            <h1><?php the_title(); ?></h1>
            <h4 class="content__excerpt"><?php the_excerpt(); ?></h4>
          </header>

          <div class="content__body">
            <?php the_content(); ?>
          </div>

          <div class="container">

            <?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>

          </div>

        <?php endwhile; ?>

      <?php else : ?>

        <?php get_template_part('inc/gone'); ?>

      <?php endif; ?>

    </section>

  </main>

<?php get_footer(); ?>
