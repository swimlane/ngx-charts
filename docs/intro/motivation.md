# Motivation

D3 is a great library and works really well, so why go through all the effort
to use Angular to draw the SVGs vs just creating a wrapper?

When we first started this project internally some 2 years ago, we did exactly
that ( Yes, the core features of this library has been used in a production app for over 2
years now ). It was very difficult to create highly resuable charts and the code
was not clear. It kinda reminded me of jQuery 7 years ago or so with the spagehhti code.

Additionally, if we created a wrapper we would violate a core principle of frameworks
like Angular or React, theortically there should only be one framework touching the DOM.
If you have multiple libraries touching the DOM, things can get out of sync and create
unpredictable results.

By creating charts using Angular components, it lets you create very composable
charts with high reuse of common elements like axises/etc. It makes it even easier
to extend to add capabilities or compose advanced charts using multiple chart types
in one canvas.

With that said, it is VERY difficult to do everything that D3 does, so we aren't
quite all the way there but in upcoming releases we plan to move further away.
