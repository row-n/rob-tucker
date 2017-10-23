<?php get_header(); ?>

<main class="main">

  <section class="content">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post(); ?>

        <header class="content__header">
          <h1><?php the_title(); ?></h1>
        </header>

        <?php if (has_post_thumbnail()) the_post_thumbnail(); ?>

        <div class="entry">

          <?php the_content(); ?>

          <?php
          $fields = get_field_objects();

          if( $fields ) :
            uasort($fields,'compare_order_no');
            foreach( $fields as $field ): ?>

            <?php if( $field['value'] ): ?>
              <div class="entry__col entry__col--<?php echo $field['name']; ?>">
                <?php echo $field['value']; ?>
              </div>
            <?php endif;

            endforeach;
          endif; ?>

          <?php wp_link_pages(array('before' => 'Pages: ', 'next_or_number' => 'number')); ?>

        </div>

      <?php endwhile; ?>

    <?php else : ?>

      <?php get_template_part('inc/gone'); ?>

    <?php endif; ?>

  </section>

</main>

<?php get_footer(); ?>
