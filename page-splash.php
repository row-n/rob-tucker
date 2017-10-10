<?php
  /* Template Name: Splash */
?>

<?php get_header(); ?>

  <main class="main">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post();

        if (has_post_thumbnail()) :
          $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full');
          echo '<div class="splash" id="splash" style="background-image: url(' . esc_url($featured_img_url) . ');"><div class="mouse is-visible" id="mouse"><div class="mouse__scroll"></div></div></div>';
        endif; ?>

        <section class="content content--splash">

          <header class="content__header">
            <h1>Works</h1>
          </header>

          <div class="thumbnail-list">

            <?php
            // Set up the objects needed
            $my_wp_query = new WP_Query();
            $all_wp_pages = $my_wp_query->query(array('post_type' => 'page', 'posts_per_page' => '-1', 'order' => 'DESC'));

            // Get the page as an Object
            $portfolio =  get_page_by_title('Works');

            // Filter through all pages and find Portfolio's children
            $portfolio_children = get_page_children( $portfolio->ID, $all_wp_pages );

            foreach( $portfolio_children as $children ) {
              $thumbnail = get_the_post_thumbnail( $children->ID, 'large' );
              if ( $thumbnail ) { ?>
                <a href="<?php echo get_page_link( $children->ID ); ?>" class="thumbnail">
                  <div class="thumbnail__image">
                    <?php echo $thumbnail ?>
                  </div>
                  <div class="thumbnail__body">
                    <h3 class="thumbnail__heading"><?php echo $children->post_title; ?></h3>
                    <?php if ( $children->post_excerpt ) { ?>
                      <h5 class="thumbnail__excerpt"><?php echo $children->post_excerpt; ?></h5>
                    <?php } ?>
                  </div>
                </a>
              <?php }
            } ?>

          </div>

        <?php endwhile; ?>

      <?php else : ?>

        <?php get_template_part('inc/gone'); ?>

      <?php endif; ?>

    </section>

  </main>

<?php get_footer(); ?>
