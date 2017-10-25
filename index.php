<?php get_header(); ?>

<main class="main">

  <section class="content">

    <?php if (have_posts()) : ?>

      <header class="container content__header">
        <h1><?php single_post_title(); ?></h1>
      </header>

      <div class="content__body post-list">

        <?php while (have_posts()) : the_post(); ?>

          <a href="<?php the_permalink(); ?>" class="post">

            <?php $thumbnail = get_the_post_thumbnail( $post->ID, 'large' );
              if ( $thumbnail ) : ?>

              <div class="post__image">
                <?php echo $thumbnail ?>
              </div>

            <?php endif; ?>

            <div class="post__body">

              <h3 class="post__heading"><?php the_title(); ?></h3>

              <div class="post__excerpt">
                <?php the_excerpt(); ?>
              </div>

              <time class="time" datetime="<?php the_time('Y-m-d'); ?>" pubdate><?php the_time('F jS, Y'); ?></time>

            </div>

          </a>

        <?php endwhile; ?>
      </div>

      <?php get_template_part('inc/nav'); ?>

    <?php else : ?>

      <?php get_template_part('inc/gone'); ?>

    <?php endif; ?>

  </section>

</main>

<?php get_footer(); ?>
