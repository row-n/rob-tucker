<?php

if (!empty($_SERVER['SCRIPT_FILENAME']) && 'comments.php' == basename($_SERVER['SCRIPT_FILENAME'])) {
  die (__('Please do not load this page directly. Thanks!', 'rob-tucker'));
}

if (post_password_required()) {
  echo '<p class="alert">'. __('This post is password protected. Enter the password to view comments.', 'rob-tucker') .'</p>';
return;
}

?>

<?php if (have_comments()) : ?>

  <h2 id="comments"><?php comments_number('No Responses', 'One Response', '% Responses');?></h2>

  <div class="navigation">

    <div class="next-posts"><?php previous_comments_link(); ?></div>
    <div class="prev-posts"><?php next_comments_link(); ?></div>

  </div>

  <ol class="commentlist">

    <?php wp_list_comments(); ?>

  </ol>

  <div class="navigation">

    <div class="next-posts"><?php previous_comments_link(); ?></div>
    <div class="prev-posts"><?php next_comments_link(); ?></div>

  </div>

<?php else : // this is displayed if there are no comments so far ?>

  <?php if (comments_open()) : ?>

    <!-- If comments are open, but there are no comments. -->

  <?php else : // comments are closed ?>

    <p><?php _e('Comments are closed.', 'rob-tucker'); ?></p>

  <?php endif; ?>

<?php endif; ?>

<?php if (comments_open()) : ?>

  <div id="respond">

    <?php comment_form(); ?>

  </div>

<?php endif; ?>
