<?php get_header(); ?>

<main class="main">

  <section class="content single">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post(); ?>

        <header class="container content__header">
          <h1><?php the_title(); ?></h1>
          <time class="time" datetime="<?php the_time('Y-m-d'); ?>" pubdate><?php the_time('F jS, Y'); ?></time>
        </header>

        <?php if (has_post_thumbnail()) the_post_thumbnail(); ?>

        <div class="container">

          <div class="content__body">
            <?php the_content(); ?>
          </div>

        </div>

        <?php
        $fields = get_field_objects();

        if( $fields ) :
          uasort($fields,'compare_order_no');
          foreach( $fields as $field ): ?>

          <?php if( $field['value'] ): ?>
            <div class="single__<?php echo $field['name']; ?> gallery">
              <?php echo $field['value']; ?>
            </div>
          <?php endif;

          endforeach;
        endif; ?>

        <div class="container">

          <?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>

        </div>

        <div class="container meta">

          <div class="meta__categories">
            <h5>Categories:</h5>
            <?php the_category(' | '); ?>
          </div>

          <div class="meta__tags">
            <?php the_tags('<h5>Tags:</h5> ', ', ', ''); ?>
          </div>

        </div>

      <?php endwhile; ?>

      <div class="container">

        <h5>Continue:</h5>
        <?php get_template_part('inc/nav'); ?>

      </div>

    <?php else : ?>

      <?php get_template_part('inc/gone'); ?>

    <?php endif; ?>

  </section>

</main>

<?php get_footer(); ?>
