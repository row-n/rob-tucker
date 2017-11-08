<?php
  /* Template Name: Splash */
?>

<?php get_header(); ?>

  <main class="main">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post();

        if (has_post_thumbnail()) :
          $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full');
          echo '<div class="hero" id="hero" style="background-image: url(' . esc_url($featured_img_url) . ');">';
          echo '<button class="mouse is-visible" id="mouse"><svg class="icon icon--scroll icon--md" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2q0.414 0 0.707 0.293t0.293 0.707v15.586l5.289-5.297q0.289-0.289 0.711-0.289 0.43 0 0.715 0.285t0.285 0.715q0 0.422-0.289 0.711l-7 7q-0.289 0.289-0.711 0.289t-0.711-0.289l-7-7q-0.289-0.289-0.289-0.711 0-0.43 0.285-0.715t0.715-0.285q0.422 0 0.711 0.289l5.289 5.297v-15.586q0-0.414 0.293-0.707t0.707-0.293z"></path></svg></button>';
          echo '</div>';
        endif; ?>

        <section class="content splash">

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

            foreach( $portfolio_children as $children ) :
              $thumbnail = get_the_post_thumbnail( $children->ID, 'large' );
              if ( $thumbnail ) : ?>
                <a href="<?php echo get_page_link( $children->ID ); ?>" class="thumbnail">
                  <div class="thumbnail__image">
                    <?php echo $thumbnail ?>
                  </div>
                  <div class="thumbnail__body">
                    <h3 class="thumbnail__heading"><?php echo $children->post_title; ?></h3>
                    <?php if ( $children->post_excerpt ) : ?>
                      <h5 class="thumbnail__excerpt"><?php echo $children->post_excerpt; ?></h5>
                    <?php endif; ?>
                  </div>
                </a>
              <?php endif;
            endforeach; ?>

          </div>

        <?php endwhile; ?>

      <?php else : ?>

        <?php get_template_part('inc/gone'); ?>

      <?php endif; ?>

    </section>

  </main>

<?php get_footer(); ?>
