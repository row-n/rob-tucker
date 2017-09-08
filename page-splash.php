<?php
  /* Template Name: Splash */
?>

<?php get_header(); ?>

  <main class="main">

    <?php if (have_posts()) : ?>

      <?php while (have_posts()) : the_post();

        if (has_post_thumbnail()) :
          $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'full');
          echo '<div class="splash" style="background-image: url(' . esc_url($featured_img_url) . ');"><div class="mouse is-visible" id="mouse"><div class="mouse__scroll"></div></div></div>';
        endif; ?>

        <section class="content content--splash">

          <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

            <header class="page__header">
              <h1>Works</h1>
            </header>

            <div class="thumbnail-list">

              <?php $mypages = get_pages( array( 'child_of' => 9, 'sort_column' => 'menu_order', 'sort_order' => 'ASC' ) );
              foreach( $mypages as $page ) {
                $thumbnail = get_the_post_thumbnail( $page->ID, 'large' );
                if ( $thumbnail ) { ?>
                  <a href="<?php echo get_page_link( $page->ID ); ?>" class="thumbnail">
                    <?php echo $thumbnail ?>
                    <h3 class="thumbnail__heading"><?php echo $page->post_title; ?></h3>
                  </a>
                <?php }
              } ?>

            </div>
          </article>

        <?php endwhile; ?>

      <?php else : ?>

        <?php get_template_part('inc/gone'); ?>

      <?php endif; ?>

    </section>

  </main>

<?php get_sidebar(); ?>

<?php get_footer(); ?>
