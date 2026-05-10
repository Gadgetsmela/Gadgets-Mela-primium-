<?php
/**
 * Hero section.
 *
 * @package Gadgets_Mela_Premium
 */
?>
<section class="hero section">
	<div class="container hero-grid">
		<div>
			<p class="eyebrow"><?php esc_html_e( 'New Season · Smart Tech', 'gadgets-mela-premium' ); ?></p>
			<h1><?php esc_html_e( 'Upgrade Your Everyday with Premium Gadgets', 'gadgets-mela-premium' ); ?></h1>
			<p>
				<?php esc_html_e( 'Shop handpicked electronics, accessories, and smart home essentials with fast shipping and trusted support.', 'gadgets-mela-premium' ); ?>
			</p>
			<div class="hero-actions">
				<a class="btn" href="<?php echo esc_url( home_url( '/shop' ) ); ?>"><?php esc_html_e( 'Shop Now', 'gadgets-mela-premium' ); ?></a>
				<a class="btn btn--ghost" href="<?php echo esc_url( home_url( '/deals' ) ); ?>"><?php esc_html_e( 'View Deals', 'gadgets-mela-premium' ); ?></a>
			</div>
		</div>
		<div class="hero-media">
			<img src="<?php echo gmp_placeholder_image( 'Premium+Gadgets', 800, 560 ); ?>" alt="<?php esc_attr_e( 'Featured gadgets', 'gadgets-mela-premium' ); ?>">
		</div>
	</div>
</section>
