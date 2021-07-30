# furryfriendfinder

# Troubleshooting

### User authentication on local environment

For user auth to work on your local environment, please comment out these lines in `users.route.js`, for both login and logout endpoints:

```
sameSite: "none",
secure: true,
```
