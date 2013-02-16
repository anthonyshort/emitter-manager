
build: components coffee index.js
	@component build --dev

components: component.json
	@component install --dev

coffee:
	@coffee --compile test/tests.coffee

clean:
	rm -fr build components template.js

.PHONY: clean coffee
