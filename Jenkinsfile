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
                bat 'node --version'
                bat 'npm --version'
                bat 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo "========== STAGE: Lint =========="
                bat 'npm run lint || echo Lint warnings found (non-blocking)'
            }
        }

        stage('Test') {
            steps {
                echo "========== STAGE: Test =========="
                bat 'npm test'
            }
        }

        stage('Build') {
            steps {
                echo "========== STAGE: Build =========="
                bat 'npm run build'
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
                // Add Windows deployment commands here, e.g.:
                // bat 'xcopy /E /I . C:\\inetpub\\wwwroot\\web-project'
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
            bat 'if exist node_modules rmdir /s /q node_modules'
            cleanWs()
        }
    }
}
