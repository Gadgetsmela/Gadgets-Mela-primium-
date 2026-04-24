<?php
/**
 * The header for our theme.
 *
 * @package Gadgets_Mela_Premium
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
	<div class="container header-inner">
		<div class="brand">
			<?php
			if ( has_custom_logo() ) {
				the_custom_logo();
			} else {
				?>
				<a class="brand-link" href="<?php echo esc_url( home_url( '/' ) ); ?>">
					<?php bloginfo( 'name' ); ?>
				</a>
				<?php
			}
			?>
		</div>

		<nav class="primary-nav" aria-label="<?php esc_attr_e( 'Primary navigation', 'gadgets-mela-premium' ); ?>">
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'primary',
					'container'      => false,
					'menu_class'     => 'menu',
					'fallback_cb'    => 'gmp_fallback_menu',
				)
			);
			?>
		</nav>

		<div class="header-cta">
			<a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/my-account' ) ); ?>">
				<?php esc_html_e( 'Account', 'gadgets-mela-premium' ); ?>
			</a>
			<a class="btn" href="<?php echo esc_url( home_url( '/cart' ) ); ?>">
				<?php esc_html_e( 'Cart', 'gadgets-mela-premium' ); ?>
			</a>
		</div>
	</div>
</header>
<main id="primary" class="site-main">
