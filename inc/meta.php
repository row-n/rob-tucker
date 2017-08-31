<div class="meta">
	<em><?php _e('Posted on', 'rob-tucker'); ?></em> <time datetime="<?php the_time('Y-m-d'); ?>" pubdate><?php the_time('F jS, Y'); ?></time>
	<em><?php _e('by', 'rob-tucker'); ?></em> <?php the_author(); ?> &bull;
	<span><?php comments_popup_link('Leave a comment', '1 comment', '% comments', 'comments-link', 'Comments disabled'); ?></span> &bull;
	<?php edit_post_link('Edit this &raquo;', '<span>', '</span>'); ?>
</div>