<?php if (is_singular()) : ?>

<div class="nav nav-post nav-single">

	<?php previous_post_link('<div class="nav-prev">%link</div>', '&larr;&nbsp;%title'); ?>
	<?php next_post_link('<div class="nav-next">%link</div>', '%title&nbsp;&rarr;'); ?>

</div>

<?php elseif (get_next_posts_link() || get_previous_posts_link()) : ?>

<div class="nav nav-post nav-archive">

	<?php if (get_next_posts_link()) : ?>

	<div class="nav-prev"><?php next_posts_link(__('&larr; Previous', 'rob-tucker')); ?></div>

	<?php endif; ?>

	<?php if (get_previous_posts_link()) : ?>

	<div class="nav-next"><?php previous_posts_link(__('Next &rarr;', 'rob-tucker')); ?></div>

	<?php endif; ?>

</div>

<?php endif; ?>