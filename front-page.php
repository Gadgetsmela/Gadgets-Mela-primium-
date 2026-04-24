<?php
/**
 * Front page template.
 *
 * @package Gadgets_Mela_Premium
 */

get_header();

get_template_part( 'template-parts/hero' );
get_template_part( 'template-parts/section-featured-categories' );
get_template_part( 'template-parts/section-new-arrivals' );
get_template_part( 'template-parts/section-deals' );
get_template_part( 'template-parts/section-usp' );
get_template_part( 'template-parts/section-newsletter' );

get_footer();
