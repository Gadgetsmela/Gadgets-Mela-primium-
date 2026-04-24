<?php
/**
 * Product card partial.
 *
 * @package Gadgets_Mela_Premium
 */

$args = wp_parse_args(
	$args ?? array(),
	array(
		'name'  => __( 'Sample Product', 'gadgets-mela-premium' ),
		'price' => '$99.00',
		'image' => gmp_placeholder_image( 'Product', 600, 420 ),
		'url'   => home_url( '/shop' ),
	)
);
?>
<article class="product-card">
	<a href="<?php echo esc_url( $args['url'] ); ?>" class="product-card__image-link">
		<img src="<?php echo esc_url( $args['image'] ); ?>" alt="<?php echo esc_attr( $args['name'] ); ?>">
	</a>
	<div class="product-card__content">
		<h3><a href="<?php echo esc_url( $args['url'] ); ?>"><?php echo esc_html( $args['name'] ); ?></a></h3>
		<p class="price"><?php echo esc_html( $args['price'] ); ?></p>
		<a class="btn btn--small" href="<?php echo esc_url( $args['url'] ); ?>"><?php esc_html_e( 'View Product', 'gadgets-mela-premium' ); ?></a>
	</div>
</article>
