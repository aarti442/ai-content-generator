<?php
/*
Plugin Name: AI Content Generator
Description: A Gutenberg block that generates post content using AI.
Version: 1.0
Author: Your Name
*/

function ai_content_generator_register_block() {
    wp_register_script(
        'ai-content-generator-block',
        plugins_url('block.js', __FILE__),
        array('wp-blocks', 'wp-editor', 'wp-components', 'wp-element')
    );

    wp_register_style(
        'ai-content-generator-editor-style',
        plugins_url('editor.css', __FILE__),
        array('wp-edit-blocks')
    );

    register_block_type('ai-content-generator/block', array(
        'editor_script' => 'ai-content-generator-block',
        'editor_style'  => 'ai-content-generator-editor-style',
    ));
}

add_action('init', 'ai_content_generator_register_block');
