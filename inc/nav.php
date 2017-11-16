<?php if (is_singular()) : ?>

<div class="pagination pagination--single">

	<?php previous_post_link('<div class="pagination__prev">%link</div>', '&larr;&nbsp;%title'); ?>
	<?php next_post_link('<div class="pagination__next">%link</div>', '%title&nbsp;&rarr;'); ?>

</div>

<?php elseif (get_next_posts_link() || get_previous_posts_link()) : ?>

<div class="pagination pagination--archive">

	<?php if (get_next_posts_link()) : ?>

	<div class="pagination__prev"><?php next_posts_link(__('&larr; Previous', 'rob-tucker')); ?></div>

	<?php endif; ?>

	<?php if (get_previous_posts_link()) : ?>

	<div class="pagination__next"><?php previous_posts_link(__('Next &rarr;', 'rob-tucker')); ?></div>

	<?php endif; ?>

</div>

<?php endif; ?>
