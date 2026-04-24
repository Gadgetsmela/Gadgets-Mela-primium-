<?php
/**
 * Theme functions and definitions.
 *
 * @package Gadgets_Mela_Premium
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'gmp_setup_theme' ) ) {
	/**
	 * Register theme supports and menus.
	 */
	function gmp_setup_theme(): void {
		load_theme_textdomain( 'gadgets-mela-premium', get_template_directory() . '/languages' );

		add_theme_support( 'title-tag' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
		add_theme_support( 'custom-logo', array( 'height' => 48, 'width' => 220, 'flex-height' => true, 'flex-width' => true ) );
		add_theme_support( 'customize-selective-refresh-widgets' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'woocommerce' );

		register_nav_menus(
			array(
				'primary' => esc_html__( 'Primary Menu', 'gadgets-mela-premium' ),
				'footer'  => esc_html__( 'Footer Menu', 'gadgets-mela-premium' ),
			)
		);
	}
}
add_action( 'after_setup_theme', 'gmp_setup_theme' );

/**
 * Enqueue frontend assets.
 */
function gmp_enqueue_assets(): void {
	$theme      = wp_get_theme();
	$version    = $theme->get( 'Version' ) ?: '2.0.0';
	$theme_uri  = get_template_directory_uri();

	wp_enqueue_style( 'gmp-style', get_stylesheet_uri(), array(), $version );
	wp_enqueue_style( 'gmp-main', $theme_uri . '/assets/css/main.css', array( 'gmp-style' ), $version );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'gmp_enqueue_assets' );

/**
 * Register widget areas.
 */
function gmp_widgets_init(): void {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'gadgets-mela-premium' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'gadgets-mela-premium' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'gmp_widgets_init' );

/**
 * Lightweight helper for placeholder images.
 */
function gmp_placeholder_image( string $text = 'Gadget', int $width = 640, int $height = 480 ): string {
	return esc_url( sprintf( 'https://placehold.co/%1$dx%2$d/eef2ff/1f2937?text=%3$s', $width, $height, rawurlencode( $text ) ) );
}

/**
 * Render a fallback menu if no menu is assigned.
 */
function gmp_fallback_menu(): void {
	echo '<ul class="menu-fallback">';
	echo '<li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'gadgets-mela-premium' ) . '</a></li>';
	echo '<li><a href="' . esc_url( home_url( '/shop' ) ) . '">' . esc_html__( 'Shop', 'gadgets-mela-premium' ) . '</a></li>';
	echo '<li><a href="' . esc_url( home_url( '/deals' ) ) . '">' . esc_html__( 'Deals', 'gadgets-mela-premium' ) . '</a></li>';
	echo '<li><a href="' . esc_url( home_url( '/contact' ) ) . '">' . esc_html__( 'Contact', 'gadgets-mela-premium' ) . '</a></li>';
	echo '</ul>';
}
