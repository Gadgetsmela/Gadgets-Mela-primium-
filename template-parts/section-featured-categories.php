<?php
/**
 * Featured categories section.
 *
 * @package Gadgets_Mela_Premium
 */

$categories = array(
	array( 'title' => __( 'Smartphones', 'gadgets-mela-premium' ), 'desc' => __( 'Flagships and budget picks', 'gadgets-mela-premium' ), 'link' => home_url( '/category/smartphones' ) ),
	array( 'title' => __( 'Audio', 'gadgets-mela-premium' ), 'desc' => __( 'Earbuds, headsets, speakers', 'gadgets-mela-premium' ), 'link' => home_url( '/category/audio' ) ),
	array( 'title' => __( 'Wearables', 'gadgets-mela-premium' ), 'desc' => __( 'Smartwatches and fitness bands', 'gadgets-mela-premium' ), 'link' => home_url( '/category/wearables' ) ),
	array( 'title' => __( 'Smart Home', 'gadgets-mela-premium' ), 'desc' => __( 'Automation and security tech', 'gadgets-mela-premium' ), 'link' => home_url( '/category/smart-home' ) ),
);
?>
<section class="section">
	<div class="container">
		<div class="section-head">
			<h2><?php esc_html_e( 'Featured Categories', 'gadgets-mela-premium' ); ?></h2>
		</div>
		<div class="category-grid">
			<?php foreach ( $categories as $category ) : ?>
				<a class="category-card" href="<?php echo esc_url( $category['link'] ); ?>">
					<h3><?php echo esc_html( $category['title'] ); ?></h3>
					<p><?php echo esc_html( $category['desc'] ); ?></p>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>
