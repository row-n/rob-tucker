	<div class="clear"></div>
	</div><!--.main-container-->
	<div id="footer"><footer>
		<a href="javascript:void(0)" class="scroll-top clear"><?php _e('Top'); ?></a>
		<p class="copy">&copy; <?php echo date("Y") ?> <a href="<?php bloginfo('url'); ?>/" title="<?php bloginfo('description'); ?>"><?php bloginfo('name'); ?></a>. <?php _e('All Rights Reserved.'); ?></p>
	</footer></div><!--#footer-->
</div><!--#main-->
<?php wp_footer(); /* this is used by many Wordpress features and plugins to work proporly */ ?>


<script src="<?php bloginfo( 'template_url' ); ?>/js/plugins.js"></script>
<script src="<?php bloginfo( 'template_url' ); ?>/js/main.js"></script>

</body>
</html>