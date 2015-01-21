<?php
/*
Template Name: Gallery
*/
?>

<?php get_header(); ?>

<div id="content">
	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
		<div id="post-<?php the_ID(); ?>" <?php post_class('page'); ?>>
			<article>
				<h1><?php the_title(); ?></h1>
				<?php edit_post_link('<small>Edit this entry</small>','',''); ?>
	
				<div class="post-content page-content">
					<?php the_content(); ?>
					<?php wp_link_pages('before=<div class="pagination">&after=</div>'); ?>
				</div><!--.post-content .page-content -->
			</article>
		</div><!--#post-# .post-->

	<?php endwhile; ?>
</div><!--#content-->

<?php get_footer(); ?>
