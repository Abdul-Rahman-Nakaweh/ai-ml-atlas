import type { Concept } from "@/types/concept";
import { eq, eqParts } from "./helpers";

export const deepLearningLessons: Partial<Record<string, Partial<Concept>>> = {
  "neural-network": {
    coreMeaning:
      "A neural network is a stack of layers that transform inputs through weighted sums and nonlinear activations to produce predictions. Each layer learns a representation passed to the next.",
    workflowLocation:
      "Model selection and training when tabular, vision, or sequence patterns require learned hierarchical representations.",
    functionRole:
      "Learns composite feature representations jointly with the prediction task through layered nonlinear transforms.",
    mechanism:
      "Forward pass computes layer outputs: a = σ(Wx + b). Backpropagation applies the chain rule to compute gradients; optimizers update weights to minimize loss.",
    equation: eq(
      "a⁽ˡ⁾ = σ(W⁽ˡ⁾ a⁽ˡ−¹⁾ + b⁽ˡ⁾)",
      "Each layer l applies weight matrix W, bias b, and activation σ to the previous layer's output.",
      "Stacking layers composes nonlinear functions. Deep stacks learn hierarchical features—edges, textures, objects in vision.",
      [
        { symbol: "a⁽ˡ⁾", meaning: "Activation output of layer l" },
        { symbol: "W⁽ˡ⁾", meaning: "Weight matrix at layer l" },
        { symbol: "b⁽ˡ⁾", meaning: "Bias vector at layer l" },
        { symbol: "σ", meaning: "Nonlinear activation function (ReLU, sigmoid, etc.)" },
      ]
    ),
    example:
      "A three-layer MLP maps standardized sensor readings to equipment failure probability after training on labeled maintenance logs.",
    commonDistinction:
      "Fully connected layers versus specialized architectures—CNN for spatial data, Transformers for sequences.",
    limitation:
      "Requires careful scaling, sufficient data, and validation monitoring; capacity must be controlled to avoid overfitting.",
    learnBefore: ["gradient-descent", "loss-function"],
    learnAfter: ["backpropagation", "cnn", "activation-function"],
  },
  "gradient-descent": {
    coreMeaning:
      "Gradient descent iteratively updates model parameters in the direction opposite to the gradient of the loss function, moving toward parameter values that reduce training error.",
    workflowLocation:
      "Core optimization procedure during training of differentiable models—neural networks, linear models, logistic regression.",
    functionRole:
      "Finds parameter values that minimize the training loss when no closed-form solution exists or datasets are large.",
    mechanism:
      "The gradient ∇J(θ) points uphill on the loss surface; subtracting a scaled gradient moves downhill. Variants include stochastic (minibatch) and adaptive (Adam) updates.",
    equation: eq(
      "θ_new = θ_old − α · ∇J(θ)",
      "Each update subtracts the learning rate α times the gradient of loss J with respect to parameters θ.",
      "Large α converges faster but may overshoot; small α is stable but slow. Minibatch gradients add noise that can help escape shallow local minima.",
      [
        { symbol: "θ", meaning: "Model parameters (weights and biases)" },
        { symbol: "α", meaning: "Learning rate (step size hyperparameter)" },
        { symbol: "∇J(θ)", meaning: "Gradient of loss with respect to θ" },
      ],
      "Use learning rate schedules and validation monitoring; Adam adapts per-parameter step sizes."
    ),
    example:
      "A neural network trains for one hundred epochs, updating weights each minibatch with Adam at initial learning rate 0.001.",
    commonDistinction:
      "Iterative gradient-based optimization versus closed-form OLS for linear regression on moderate data.",
    limitation:
      "Sensitive to learning rate and loss landscape; may converge to local minima or saddle points without momentum or adaptive methods.",
    learnBefore: ["loss-function", "parameter"],
    learnAfter: ["backpropagation", "neural-network"],
  },
  backpropagation: {
    coreMeaning:
      "Backpropagation computes gradients of the loss with respect to every network parameter by applying the chain rule backward through the computational graph.",
    workflowLocation:
      "During training of neural networks after the forward pass computes predictions and loss.",
    functionRole:
      "Enables efficient gradient computation for deep networks with millions of parameters.",
    mechanism:
      "The forward pass stores intermediate activations. The backward pass propagates error signals from the output layer to earlier layers, multiplying local gradients at each node.",
    example:
      "Training a ten-layer CNN: forward pass computes logits and cross-entropy loss; backward pass updates convolution and fully connected weights in one pass.",
    commonDistinction:
      "Gradient computation algorithm versus gradient descent, which uses those gradients to update parameters.",
    limitation:
      "Vanishing or exploding gradients in very deep networks require skip connections, normalization, or careful initialization.",
    learnBefore: ["gradient-descent", "neural-network", "loss-function"],
    learnAfter: ["cnn", "activation-function"],
  },
  "activation-function": {
    coreMeaning:
      "An activation function introduces nonlinearity after each layer's weighted sum. Without it, stacked linear layers would collapse to a single linear transform.",
    workflowLocation:
      "Applied after every layer's linear transform during forward computation in neural networks.",
    functionRole:
      "Enables networks to approximate nonlinear functions and learn complex decision boundaries.",
    mechanism:
      "Common choices: ReLU (max(0, x)) for hidden layers; sigmoid or tanh for gates in RNNs; softmax for multiclass output probabilities.",
    equation: eqParts(
      [
        {
          label: "ReLU",
          expression: "ReLU(x) = max(0, x)",
          symbols: [{ symbol: "ReLU(x)", meaning: "Rectified linear unit—most common hidden activation" }],
        },
        {
          label: "Sigmoid",
          expression: "σ(x) = 1 / (1 + e^(−x))",
          symbols: [{ symbol: "σ(x)", meaning: "Sigmoid—maps to probability-like range (0, 1)" }],
        },
      ],
      "ReLU passes positive values unchanged and zeros negatives; sigmoid squashes to (0, 1).",
      "ReLU avoids vanishing gradients for positive inputs; sigmoid is useful for probabilities but saturates at extremes."
    ),
    example:
      "Hidden layers in an image classifier use ReLU; the output layer uses softmax over ten digit classes.",
    commonDistinction:
      "Hidden activations (ReLU) versus output activations matched to task (softmax for classification, linear for regression).",
    limitation:
      "ReLU neurons can die (always output zero); sigmoid and tanh saturate, slowing learning in deep stacks.",
    learnBefore: ["neural-network"],
    learnAfter: ["backpropagation", "cnn"],
  },
  cnn: {
    coreMeaning:
      "A Convolutional Neural Network applies learnable filters across spatial input grids to detect local patterns and build hierarchical feature maps through pooling and stacked convolution layers.",
    workflowLocation:
      "Model selection and training for image, video frame, and spatial sensor data.",
    functionRole:
      "Exploits spatial locality and translation invariance to learn visual or spatial features efficiently.",
    mechanism:
      "Convolution slides filters over input; each filter detects a local pattern. Pooling reduces spatial resolution. Deeper layers combine low-level edges into higher-level structures.",
    example:
      "A keyword-spotting CNN on spectrograms learns frequency-time patterns for wake-word detection on embedded hardware.",
    commonDistinction:
      "Spatial weight sharing versus fully connected networks that treat each input independently.",
    limitation:
      "Requires more data and compute than classical methods; very deep CNNs need careful regularization.",
    learnBefore: ["neural-network", "backpropagation"],
    learnAfter: ["vit", "transfer-learning"],
  },
  rnn: {
    coreMeaning:
      "A Recurrent Neural Network processes sequential data by maintaining a hidden state updated at each time step, allowing prior context to influence current outputs.",
    workflowLocation:
      "Model selection for sequences—time series, text, speech—when temporal order matters.",
    functionRole:
      "Captures temporal dependencies by passing information forward through hidden state vectors.",
    mechanism:
      "At each step t: h_t = f(h_{t−1}, x_t) where h is hidden state and x is input. Output may depend on h_t or the full sequence.",
    equation: eq(
      "h_t = tanh(W_h h_{t−1} + W_x x_t + b)",
      "Hidden state h_t combines the previous state and current input through learned weights.",
      "Information flows across time steps via h. Vanilla RNNs struggle with long-range dependencies due to vanishing gradients.",
      [
        { symbol: "h_t", meaning: "Hidden state at time step t" },
        { symbol: "x_t", meaning: "Input at time step t" },
        { symbol: "W_h, W_x", meaning: "Recurrent and input weight matrices" },
      ]
    ),
    example:
      "A character-level RNN generates text one character at a time, conditioning each output on the accumulated hidden state.",
    commonDistinction:
      "Sequential recurrence versus Transformer self-attention, which processes all positions in parallel.",
    limitation:
      "Vanishing gradients limit long-range memory; LSTM and GRU gates partially address this.",
    learnBefore: ["neural-network", "gradient-descent"],
    learnAfter: ["lstm", "transformer"],
  },
  lstm: {
    coreMeaning:
      "Long Short-Term Memory networks extend RNNs with gated cell states that selectively retain or forget information across time steps, mitigating vanishing gradient problems.",
    workflowLocation:
      "Sequence modeling when long-range dependencies exceed what vanilla RNNs capture reliably.",
    functionRole:
      "Maintains long-term memory through gated cell state while updating short-term hidden outputs.",
    mechanism:
      "Forget, input, and output gates control information flow into and out of the cell state. Gradients can flow through the cell state with less decay than vanilla RNN hidden states.",
    example:
      "An LSTM forecasts hourly energy demand using seven days of history, retaining weekly seasonality in the cell state.",
    commonDistinction:
      "Gated recurrence versus Transformer attention—LSTMs process sequentially; Transformers attend in parallel.",
    limitation:
      "Slower to train than Transformers on long sequences with sufficient data; still sequential at inference.",
    learnBefore: ["rnn", "backpropagation"],
    learnAfter: ["transformer", "attention"],
  },
  autoencoder: {
    coreMeaning:
      "An autoencoder learns to compress inputs into a lower-dimensional latent representation and reconstruct the original input through a decoder network.",
    workflowLocation:
      "Unsupervised feature learning, dimensionality reduction, denoising, and anomaly detection.",
    functionRole:
      "Discovers compact representations that preserve essential input structure for reconstruction.",
    mechanism:
      "The encoder maps x → z (latent code); the decoder maps z → x̂. Training minimizes reconstruction error ||x − x̂||. Bottleneck dimension forces compression.",
    equation: eq(
      "Loss = ||x − decoder(encoder(x))||²",
      "Training minimizes squared reconstruction error between input x and its reconstruction.",
      "The encoder learns a compressed representation; high reconstruction error on new data signals anomalies.",
      [
        { symbol: "encoder(x)", meaning: "Maps input to latent code z" },
        { symbol: "decoder(z)", meaning: "Reconstructs input from latent code" },
      ]
    ),
    example:
      "A factory vibration autoencoder trained on healthy equipment flags anomalies when reconstruction error exceeds a threshold on new readings.",
    commonDistinction:
      "Nonlinear learned compression versus PCA's linear projection; autoencoders can capture nonlinear structure.",
    limitation:
      "Latent codes are less interpretable than PCA components; requires sufficient training data for the input domain.",
    learnBefore: ["neural-network", "pca"],
    learnAfter: ["embeddings", "feature-extraction"],
  },
  mlp: {
    coreMeaning:
      "A Multilayer Perceptron is a fully connected feedforward neural network with one or more hidden layers between input and output.",
    workflowLocation:
      "Baseline neural model for tabular data and simple classification after feature scaling.",
    functionRole:
      "Learns nonlinear mappings from flat feature vectors to outputs through stacked dense layers.",
    mechanism:
      "Each layer applies weight matrix, bias, and activation. Universal approximation theorem guarantees MLPs can represent continuous functions given sufficient width and depth.",
    example:
      "A two-hidden-layer MLP with ReLU activations classifies loan default risk from twelve financial features.",
    commonDistinction:
      "Fully connected architecture versus CNN (spatial) or Transformer (sequential attention) specializations.",
    limitation:
      "Does not exploit spatial or sequential structure; tree ensembles often outperform on small tabular data.",
    learnBefore: ["neural-network", "standardization"],
    learnAfter: ["cnn", "backpropagation"],
  },
};
