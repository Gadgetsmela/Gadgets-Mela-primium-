<?php
/**
 * The footer template.
 *
 * @package Gadgets_Mela_Premium
 */
?>
</main>
<footer class="site-footer">
	<div class="container footer-inner">
		<div>
			<p class="footer-brand"><?php bloginfo( 'name' ); ?></p>
			<p class="footer-copy">
				<?php echo esc_html( gmdate( 'Y' ) ); ?> &copy; <?php bloginfo( 'name' ); ?>.
			</p>
		</div>
		<nav aria-label="<?php esc_attr_e( 'Footer navigation', 'gadgets-mela-premium' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'container'      => false,
					'menu_class'     => 'footer-menu',
					'fallback_cb'    => false,
				)
			);
			?>
		</nav>
	</div>
</footer>
<?php wp_footer(); ?>
</body>
</html>
