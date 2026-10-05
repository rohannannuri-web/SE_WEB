pipeline {
    agent any

    environment {
        APP_NAME = 'web-project'
        NODE_ENV = 'production'
    }

    stages {

        stage('Checkout') {
            steps {
                echo "========== STAGE: Checkout =========="
                echo "Checking out source code from SCM..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "========== STAGE: Install Dependencies =========="
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo "========== STAGE: Lint =========="
                sh 'npm run lint || echo "Lint warnings found (non-blocking)"'
            }
        }

        stage('Test') {
            steps {
                echo "========== STAGE: Test =========="
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo "========== STAGE: Build =========="
                sh 'npm run build'
                echo "Build completed successfully!"
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo "========== STAGE: Archive Artifacts =========="
                archiveArtifacts artifacts: '**/*',
                                 excludes: 'node_modules/**',
                                 fingerprint: true
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo "========== STAGE: Deploy =========="
                echo "Deploying ${APP_NAME} to production..."
                // Add deployment commands here, e.g.:
                // sh 'pm2 restart web-project || pm2 start index.js --name web-project'
                echo "Deployment complete!"
            }
        }
    }

    post {
        success {
            echo "=============================="
            echo "  BUILD SUCCESSFUL!"
            echo "  Project: ${APP_NAME}"
            echo "=============================="
        }
        failure {
            echo "=============================="
            echo "  BUILD FAILED!"
            echo "  Check the logs above."
            echo "=============================="
        }
        always {
            echo "Pipeline finished. Cleaning up..."
            sh 'rm -rf node_modules || true'
            cleanWs()
        }
    }
}
