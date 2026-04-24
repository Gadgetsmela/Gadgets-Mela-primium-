<?php
/**
 * Why us section.
 *
 * @package Gadgets_Mela_Premium
 */

$points = array(
	__( '100% authentic products from trusted brands', 'gadgets-mela-premium' ),
	__( 'Fast nationwide delivery with live tracking', 'gadgets-mela-premium' ),
	__( 'Secure checkout and multiple payment options', 'gadgets-mela-premium' ),
	__( 'Expert support before and after purchase', 'gadgets-mela-premium' ),
);
?>
<section class="section section--muted">
	<div class="container">
		<div class="section-head">
			<h2><?php esc_html_e( 'Why Shop With Us', 'gadgets-mela-premium' ); ?></h2>
		</div>
		<ul class="usp-list">
			<?php foreach ( $points as $point ) : ?>
				<li><?php echo esc_html( $point ); ?></li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>
