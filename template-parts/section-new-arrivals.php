<?php
/**
 * New arrivals section.
 *
 * @package Gadgets_Mela_Premium
 */

$products = array(
	array( 'name' => __( 'Nova X Pro Phone', 'gadgets-mela-premium' ), 'price' => '$899', 'image' => gmp_placeholder_image( 'Nova+X+Pro', 600, 420 ), 'url' => home_url( '/product/nova-x-pro-phone' ) ),
	array( 'name' => __( 'AirPulse Buds 3', 'gadgets-mela-premium' ), 'price' => '$129', 'image' => gmp_placeholder_image( 'AirPulse+Buds+3', 600, 420 ), 'url' => home_url( '/product/airpulse-buds-3' ) ),
	array( 'name' => __( 'Orbit Watch S', 'gadgets-mela-premium' ), 'price' => '$249', 'image' => gmp_placeholder_image( 'Orbit+Watch+S', 600, 420 ), 'url' => home_url( '/product/orbit-watch-s' ) ),
	array( 'name' => __( 'UltraCharge 140W', 'gadgets-mela-premium' ), 'price' => '$79', 'image' => gmp_placeholder_image( 'UltraCharge+140W', 600, 420 ), 'url' => home_url( '/product/ultracharge-140w' ) ),
);
?>
<section class="section section--muted">
	<div class="container">
		<div class="section-head">
			<h2><?php esc_html_e( 'New Arrivals', 'gadgets-mela-premium' ); ?></h2>
			<a href="<?php echo esc_url( home_url( '/shop' ) ); ?>"><?php esc_html_e( 'Browse all', 'gadgets-mela-premium' ); ?></a>
		</div>
		<div class="product-grid">
			<?php foreach ( $products as $product ) : ?>
				<?php get_template_part( 'template-parts/product-card', null, $product ); ?>
			<?php endforeach; ?>
		</div>
	</div>
</section>
