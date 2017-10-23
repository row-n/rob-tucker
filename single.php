<?php get_header(); ?>

<main class="main">

  <section class="content">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post(); ?>

        <header class="content__header">
          <h1><?php the_title(); ?></h1>
          <time class="time" datetime="<?php the_time('Y-m-d'); ?>" pubdate><?php the_time('F jS, Y'); ?></time>
        </header>

        <?php if (has_post_thumbnail()) the_post_thumbnail(); ?>

        <div class="entry">

          <?php the_content(); ?>

          <?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>

        </div>

        <div class="meta">

          <div class="meta__tags">
            <?php the_tags('<p>Tags: ', ', ', '</p>'); ?>
          </div>

          <div class="meta__categories">
            <?php the_category(' | '); ?>
          </div>

        </div>

      <?php endwhile; ?>

      <?php get_template_part('inc/nav'); ?>

    <?php else : ?>

      <?php get_template_part('inc/gone'); ?>

    <?php endif; ?>

  </section>

</main>

<?php get_footer(); ?>
