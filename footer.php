
  <footer class="footer" role="contentinfo">
    <div class="footer__content">
      <p class="copyright">&copy; <?php echo date('Y'); ?> Copyright <?php bloginfo('name'); ?></p>
    </div>
  </footer>

  <a href="javascript:void(0)" id="back-to-top" class="back-to-top">
    <svg role="img" class="icon icon--chevron-up icon--xs">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#chevron-up"></use>
    </svg>
  </a>

  <?php get_template_part('inc/icons'); ?>
  <?php wp_footer(); ?>

  </body>
</html>
