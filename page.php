<?php get_header(); ?>

  <main class="main">

    <section class="content">

      <?php if (have_posts()) : ?>

        <?php while (have_posts()) : the_post(); ?>

          <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

            <header class="page__header">
              <h1><?php the_title(); ?></h1>
            </header>

            <?php get_template_part('inc/meta'); ?>

            <?php if (has_post_thumbnail()) the_post_thumbnail(); ?>

            <div class="entry">

              <?php the_content(); ?>

              <?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>

            </div>

          </article>

        <?php endwhile; ?>

        <?php comments_template(); ?>

      <?php else : ?>

        <?php get_template_part('inc/gone'); ?>

      <?php endif; ?>

    </section>

  </main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
