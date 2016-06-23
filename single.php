<?php get_header(); ?>
<div id="content">
	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
		<div id="post-<?php the_ID(); ?>" <?php post_class('post'); ?>>

			<article class="content-width">
				<h1><a href="<?php the_permalink() ?>" title="<?php the_title(); ?>" rel="bookmark"><?php the_title(); ?></a></h1>
				<div id="post-author">
					<h4><?php _e('Written by '); the_author_posts_link() ?></h4>
				</div><!--#post-author-->
				<?php edit_post_link('<small>Edit this entry</small>','',''); ?>
				<?php if ( has_post_thumbnail() ) { /* loades the post's featured thumbnail, requires Wordpress 3.0+ */ echo '<div class="featured-thumbnail">'; the_post_thumbnail(); echo '</div>'; } ?>
				<div class="post-content">
					<?php the_content(); ?>
					<?php wp_link_pages('before=<div class="pagination">&after=</div>'); ?>
				</div><!--.post-content-->
			</article>

			<div id="post-meta">
				<p>
					<small>
						<?php _e('Posted on '); the_time('F j, Y'); _e(' at '); the_time() ?> // <a href="<?php bloginfo('rss2_url'); ?>" rel="nofollow">RSS 2.0</a> feed.<br />
						<?php _e(' Categories: '); the_category(', ') ?><br />
						<?php the_tags('Tags: ', ', ', ' '); ?>
					</small>
				</p>
			</div><!--#post-meta-->

			<?php /* If a user fills out their bio info, it's included here */ ?>			

		</div><!-- #post-## -->

		<div class="newer-older">
			<p class="older"><?php previous_post_link('%link', '&laquo; Previous post') ?>
			<p class="newer"><?php next_post_link('%link', 'Next Post &raquo;') ?></p>
		</div><!--.newer-older-->

	<?php endwhile; /* end loop */ ?>
</div><!--#content-->
<?php get_sidebar(); ?>
<?php get_footer(); ?>