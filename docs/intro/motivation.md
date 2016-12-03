# Motivation

D3 is a great library and works really well, so why go through all the effort
to use Angular to draw the SVGs vs just creating a wrapper?

When we first started this project internally some two years ago, we did exactly
that (yes, the core features of this library have been used in a production app for over two
years now). It was very difficult to create highly reusable charts and the code
was not clear. It kind of reminded me of jQuery seven years ago or so with the spaghetti code.

Additionally, if we created a wrapper we would violate a core principle of frameworks
like Angular or React, where there should only be one framework touching the DOM.
If you have multiple libraries touching the DOM, things can get out of sync and create
unpredictable results.

By creating charts using Angular components, it lets you create very composable
charts with high reuse of common elements like axis, bars, circles, etc. It makes it even easier to extend to add capabilities or compose advanced charts using multiple chart types
in one canvas.

With that said, it is VERY difficult to do everything that D3 does, so we aren't
quite all the way there but in upcoming releases we plan to move further away.
