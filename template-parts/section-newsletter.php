<?php
/**
 * Newsletter callout.
 *
 * @package Gadgets_Mela_Premium
 */
?>
<section class="section">
	<div class="container">
		<div class="newsletter">
			<div>
				<h2><?php esc_html_e( 'Get Exclusive Gadget Deals in Your Inbox', 'gadgets-mela-premium' ); ?></h2>
				<p><?php esc_html_e( 'Join our newsletter for early access to launches, coupon codes, and buying guides.', 'gadgets-mela-premium' ); ?></p>
			</div>
			<form class="newsletter-form" action="#" method="post">
				<label class="screen-reader-text" for="gmp-email"><?php esc_html_e( 'Email address', 'gadgets-mela-premium' ); ?></label>
				<input id="gmp-email" type="email" name="email" placeholder="you@example.com" required>
				<button class="btn" type="submit"><?php esc_html_e( 'Subscribe', 'gadgets-mela-premium' ); ?></button>
			</form>
		</div>
	</div>
</section>
