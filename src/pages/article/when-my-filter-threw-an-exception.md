---
layout: '../../layouts/Article.astro'

title: When my filter threw an exception
description: While at first it seemed a trivial thing to write, cleanly handling exceptions thrown in servlet filters isn't that obvious in Spring Boot.
date: 2020-02-25
banner: filter.jpg
read: 5
tags:
  - spring
  - kotlin
---

Recently I have started working on a new Spring Boot project: a web application that will feed the data to a mobile application I hope to start working on soon. This project makes for a good opportunity to freshen up my [Spring](https://spring.io/) knowledge and get to play with [Kotlin](https://kotlinlang.org/) a bit more. Because I wanted a server application for a mobile client application, I decided to implement authentication using [JSON Web Tokens](https://jwt.io/), also known as JWT.

## From authentication

My first approach was to create two custom filters, one for authentication and one for authorization, and plug them into Tomcat’s built-in [`FilterChain`](https://tomcat.apache.org/tomcat-8.0-doc/servletapi/javax/servlet/FilterChain.html). However, rather sooner than later, it became apparent that a filter for authentication was a lackluster solution for what I was trying to achieve. A filter is just too “basic”: it allows you to filter (go figure) each request and apply minimal changes to it, then pass it along to the next filter in the chain, and that’s about it. While in certain cases when this is all you’d want, it certainly is a valid solution, but for me it wasn’t.

That’s why I removed my authentication filter altogether and decided to replace it with a dedicated Spring controller. Whitelisted the `RequestMapping` path of my authentication controller in `HttpSecurity`’s config so authentication requests would not be intercepted by the authorization filter _et voilà_: I could now cleanly wire/inject my user and other services, nicely separate different kind of authentication request (e.g. username and password, refresh token, registering vs logging in, …) in different methods, reuse my Kotlin helper functions (also known as top-level extension functions) to map the response to a `ResponseEntity` with all the other data I wanted added to the response, throw exceptions and have them caught and handled by a `ControllerAdvice` — something I’d soon after learn isn’t trivial outside of a Spring controller.

## To authorization

Because I am using JWT, there is by nature no need to talk to a database to validate the credentials passed along with each request. So concerning authorization, a filter would do just fine. Before I started refactoring my authentication filter to an authentication controller, I already had a basic authorization filter in place (no rocket science here: just validating the JWT’s signature and adding the token’s subject to Spring’s `SecurityContextHolder`) which still worked fine. However, when I wanted to _beautify_ my error responses (adding a clear error message to the body, properly setting the `WWW-Authenticate` header according to the RFC spec) I encountered some major drawbacks.

## The issue with exception handling

As by the time I wanted to extend my authorization filter’s functionality I already had a `ControllerAdvice` in place to handle all exceptions in a consistent way, I wanted to use the latter to handle exceptions thrown by my authorization filter as well — especially since these exceptions would be the same or similar to the ones my authentication controller was already throwing at it. And at that moment I learned that exceptions thrown in a filter are not detected by a `ControllerAdvice`, which, as its name somewhat implies, only catches exceptions thrown in controllers. If an exception occurs in a filter, Spring doesn’t even route the request to the controller mapped to handle that request.

After some googling it turned out that there is no clean way to break out of filters and directly return a `ResponseEntity`, which would have been the ideal scenario as I could have just called my `ResponseEntity` creating helper function and call it a day. I found some answers on Stack Overflow suggesting setting some Spring MVC configuration properties but those did not work for me. This might have been the case because I’m trying to limit my dependencies, including Spring ones, to as little as possible. I did not investigate this further though, since I’d still be too limited in what I wanted to achieve in the end.

## And how I’ve solved it

After some trial, error and a lot of research in the matter, I did manage to find a way to have exceptions thrown in my filter handled by my `ControllerAdvice` that I quite like! I added an extra field to my authorization class that would store an instance of Spring’s [`HandlerExceptionResolver`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/HandlerExceptionResolver.html). I’ve only recently learned about this interface and its super handy method [`resolveException()`](https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/web/servlet/HandlerExceptionResolver.html#resolveException-javax.servlet.http.HttpServletRequest-javax.servlet.http.HttpServletResponse-java.lang.Object-java.lang.Exception-) that will try to (you’ll never guess it) resolve an exception in the existing context. And when defining a `ControllerAdvice`, if I got this right, Spring will add it to the `InterceptorRegistry` and your `ExceptionHandler` annotated methods will be known in your application context.

Great! Only thing I had to do was to call `resolveException()`  in my filter and pass it the exception I want it to pass to my `ControllerAdvice` and everything would be fine and dandy. And my filter would remain really, really clean — exactly how I like them to be. 👌

```kotlin
class JwtAuthorizationFilter(authenticationManager: AuthenticationManager, private val handlerExceptionResolver: HandlerExceptionResolver) : BasicAuthenticationFilter(authenticationManager) {

    override fun doFilterInternal(req: HttpServletRequest, res: HttpServletResponse, chain: FilterChain) {
        try {
            SecurityContextHolder.getContext().authentication = this.authenticate(req)
            chain.doFilter(req, res)
        } catch (e: Exception) {
            handlerExceptionResolver.resolveException(req, res, null, e)
            return
        }
    }

    private fun authenticate(req: HttpServletRequest): UsernamePasswordAuthenticationToken {
        // Throws a bunch of different, mostly custom exceptions if something's not a-ok
    }
}
```

In order to pass an instance of `HandlerExceptionResolver` to my authentication filter, I added it as a field in my `EnableWebSecurity` annotated security configuration class so I can pass it along when defining the filter. I use Spring’s implicit constructor injection to have the default implementation of `HandlerExceptionResolver` autowired. Neat!

I’ve only found a couple of other people suggesting this approach, so though it works really well for me, I am a bit worried that I might be doing something wrong like breaking a pattern or affecting performance in some way that I haven’t noticed yet. The code for [this project is available on my GitHub](https://github.com/Qrivi/fappserver), but is a work-in-progress, so the actual implementation might have changed a bit depending on how old this post has become.
