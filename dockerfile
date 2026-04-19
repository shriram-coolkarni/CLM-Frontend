FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json pnpm-lock.yaml* package-lock.json* ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy full project
COPY . .

# Expose Vite port
EXPOSE 5173

# Run the app
CMD ["pnpm", "dev", "--host"]
