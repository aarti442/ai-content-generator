const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, Button, TextControl, Spinner } = wp.components;
const { useState } = wp.element;

registerBlockType('ai-content-generator/block', {
    title: 'AI Content Generator',
    icon: 'edit',
    category: 'widgets',
    attributes: {
        content: { type: 'string', source: 'html', selector: 'p' },
        prompt: { type: 'string', default: 'Write a blog post about WordPress' },
    },
    edit({ attributes, setAttributes }) {
        const [loading, setLoading] = useState(false);

        const generateContent = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://api.openai.com/v1/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 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',
                    },
                    body: JSON.stringify({
                        model: 'gpt-3.5-turbo',
                        prompt: attributes.prompt,
                        max_tokens: 500,
                    }),
                });
                const data = await response.json();
                setAttributes({ content: data.choices[0].text });
            } catch (error) {
                console.error('Error generating content:', error);
            } finally {
                setLoading(false);
            }
        };

        return wp.element.createElement(
            wp.element.Fragment,
            null,
            wp.element.createElement(
                InspectorControls,
                null,
                wp.element.createElement(
                    PanelBody,
                    { title: 'AI Settings' },
                    wp.element.createElement(TextControl, {
                        label: 'Prompt',
                        value: attributes.prompt,
                        onChange: (prompt) => setAttributes({ prompt }),
                    }),
                    wp.element.createElement(
                        Button,
                        { isPrimary: true, onClick: generateContent, disabled: loading },
                        loading ? wp.element.createElement(Spinner, null) : 'Generate Content'
                    )
                )
            ),
            wp.element.createElement(
                'div',
                null,
                wp.element.createElement(RichText, {
                    tagName: 'p',
                    value: attributes.content,
                    onChange: (content) => setAttributes({ content }),
                    placeholder: 'Generated content will appear here.',
                })
            )
        );
    },
    save({ attributes }) {
        return wp.element.createElement(RichText.Content, {
            tagName: 'p',
            value: attributes.content,
        });
    },
});
