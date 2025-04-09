# Use Nginx as a web server
FROM nginx:alpine AS production

# Remove the default Nginx config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy the custom Nginx configuration (from build context)
COPY ../nginx/nginx.conf /etc/nginx/nginx.conf 

# Expose ports for HTTP and HTTPS
EXPOSE 80 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
