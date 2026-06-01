import type { Concept } from "@/types/concept";
import { eq } from "./helpers";

export const preprocessingLessons: Partial<Record<string, Partial<Concept>>> = {
  preprocessing: {
    coreMeaning:
      "Preprocessing transforms raw data into a clean, consistent form suitable for modeling. Steps may include handling missing values, scaling, encoding categoricals, and removing outliers.",
    workflowLocation:
      "After data collection and before feature engineering or model training. Preprocessing pipelines are fit on training data only.",
    functionRole:
      "Removes noise, aligns formats, and prepares inputs so algorithms receive numerically stable and semantically meaningful features.",
    mechanism:
      "Each step follows fit-transform discipline: statistics (means, category maps) are estimated on training data and applied identically at inference.",
    example:
      "A tabular pipeline imputes missing ages with the training median, z-scores numeric columns, and one-hot encodes region before feeding a classifier.",
    commonDistinction:
      "Data cleaning and transformation versus feature engineering, which constructs new predictive signals from raw fields.",
    limitation:
      "Preprocessing fit on test data causes leakage; inconsistent train-serve preprocessing causes silent accuracy drops in production.",
    learnBefore: ["dataset", "feature"],
    learnAfter: ["standardization", "one-hot-encoding", "feature-engineering"],
  },
  standardization: {
    coreMeaning:
      "Standardization rescales continuous features to zero mean and unit variance using z-scores. Each value is expressed in terms of standard deviations from the training mean.",
    workflowLocation:
      "Preprocessing after handling missing values and before distance-based methods, PCA, or neural network training.",
    functionRole:
      "Puts features on comparable scales so no single variable dominates distance or gradient calculations.",
    mechanism:
      "Training-set mean μ and standard deviation σ are computed per feature; transform z = (x − μ) / σ is applied to all partitions and at inference.",
    equation: eq(
      "z = (x − μ) / σ",
      "Each value x is shifted by the training mean μ and divided by the training standard deviation σ.",
      "Zero-centered unit-variance features ensure gradient descent and distance metrics treat all dimensions fairly.",
      [
        { symbol: "x", meaning: "Original feature value" },
        { symbol: "μ", meaning: "Training-set mean of the feature" },
        { symbol: "σ", meaning: "Training-set standard deviation" },
        { symbol: "z", meaning: "Standardized value" },
      ],
      "Fit μ and σ on training data only; apply the same values to validation, test, and production inputs."
    ),
    example:
      "Sensor channels with different physical units are z-scored before k-NN or PCA so no single channel dominates distance.",
    commonDistinction:
      "Zero mean and unit variance versus min–max normalization, which bounds values to a fixed interval such as [0, 1].",
    limitation:
      "Outliers inflate σ and compress the bulk of values; robust scaling or outlier handling may be needed first.",
    learnBefore: ["preprocessing", "feature"],
    learnAfter: ["pca", "svm", "normalization"],
  },
  normalization: {
    coreMeaning:
      "Min-max normalization maps continuous values into a fixed range, typically [0, 1], by linear scaling between training-set minimum and maximum.",
    workflowLocation:
      "Preprocessing when algorithms expect bounded inputs—neural networks with sigmoid outputs, image pixels, or certain optimization routines.",
    functionRole:
      "Bounds feature magnitude while preserving relative ordering within each feature.",
    mechanism:
      "Training min and max per feature define the scale; values outside the training range may exceed [0, 1] at inference unless clipped.",
    equation: eq(
      "x_norm = (x − min) / (max − min)",
      "Each value is shifted by the training minimum and divided by the training range.",
      "Bounded inputs stabilize training for networks sensitive to input scale and match expected input domains.",
      [
        { symbol: "x", meaning: "Original feature value" },
        { symbol: "min", meaning: "Training-set minimum of the feature" },
        { symbol: "max", meaning: "Training-set maximum of the feature" },
      ],
      "Fit min and max on training data only. Outliers can compress the useful range—consider clipping or robust alternatives."
    ),
    example:
      "Pixel intensities scaled to [0, 1] before feeding a neural network that uses sigmoid activations in the output layer.",
    commonDistinction:
      "Bounded interval scaling versus standardization, which uses mean and standard deviation without fixed bounds.",
    limitation:
      "Sensitive to outliers in min/max estimation; new production values outside training range extrapolate beyond [0, 1].",
    learnBefore: ["preprocessing", "feature"],
    learnAfter: ["standardization", "neural-network"],
  },
  "one-hot-encoding": {
    coreMeaning:
      "One-hot encoding represents each categorical level as a binary indicator column. Exactly one column is active per row, eliminating false ordinal relationships between unordered categories.",
    workflowLocation:
      "Preprocessing for categorical features before training models that require numeric inputs.",
    functionRole:
      "Converts nominal categories into a numeric format without implying rank or distance between levels.",
    mechanism:
      "A vocabulary of category levels is built from training data; each row receives a vector of zeros with a one at the index of its category. Unknown categories at inference are handled via an explicit unknown bucket or error policy.",
    example:
      "Product color categories Red, Blue, and Green become three binary columns [1,0,0], [0,1,0], [0,0,1] in a pricing model.",
    commonDistinction:
      "Unordered binary indicators versus label encoding, which assigns integers and implies ordinality inappropriate for nominal data.",
    limitation:
      "High-cardinality categoricals explode dimensionality; target encoding or embeddings may be preferable with careful leakage prevention.",
    learnBefore: ["feature", "preprocessing"],
    learnAfter: ["label-encoding", "feature-engineering"],
  },
  "feature-engineering": {
    coreMeaning:
      "Feature engineering constructs, transforms, and selects input variables to expose predictive structure. It combines domain knowledge with data-driven transforms to improve model inputs.",
    workflowLocation:
      "After initial preprocessing and before model training; may iterate with validation feedback.",
    functionRole:
      "Improves signal available to the model by creating informative representations from raw fields.",
    mechanism:
      "Techniques include polynomial terms, interaction features, datetime decompositions, aggregations, binning, and domain-specific transforms. Each engineered feature must respect temporal and partition boundaries to avoid leakage.",
    example:
      "Transaction fraud features include rolling seven-day spend totals, time since last purchase, and merchant category counts derived from raw event logs.",
    commonDistinction:
      "Constructing new predictive columns versus preprocessing, which cleans and scales existing fields without adding semantic signal.",
    limitation:
      "Manual engineering does not scale to all domains; deep learning automates representation for unstructured data but sacrifices interpretability.",
    learnBefore: ["feature", "preprocessing"],
    learnAfter: ["feature-selection", "feature-extraction", "pca"],
  },
  "feature-selection": {
    coreMeaning:
      "Feature selection reduces input dimensionality by retaining a subset of original columns judged relevant while discarding redundant or uninformative ones.",
    workflowLocation:
      "After feature engineering and before model training when dimensionality or interpretability is a concern.",
    functionRole:
      "Removes noise features that increase variance, training time, and overfitting risk without improving predictions.",
    mechanism:
      "Filter methods rank by statistical tests; wrapper methods evaluate subsets by model performance; embedded methods such as L1 regularization select during training.",
    example:
      "Removing temperature sensors that correlate above 0.95 with another channel in a predictive maintenance pipeline.",
    commonDistinction:
      "Retains original column names versus feature extraction, which creates new transformed representations such as PCA components.",
    limitation:
      "Selection on the full dataset before splitting causes leakage; selection must occur inside cross-validation folds.",
    learnBefore: ["feature", "feature-engineering"],
    learnAfter: ["pca", "feature-extraction", "regularization"],
  },
  "feature-extraction": {
    coreMeaning:
      "Feature extraction constructs new input representations by transforming original features into a different space—often lower-dimensional— that captures essential structure.",
    workflowLocation:
      "After scaling and before model training when dimensionality reduction or representation learning is needed.",
    functionRole:
      "Compresses correlated or high-dimensional inputs into compact derived features that preserve important patterns.",
    mechanism:
      "Linear methods (PCA, LDA) or learned layers produce components as linear or nonlinear combinations of originals. The transform is fit on training data and applied consistently elsewhere.",
    example:
      "FFT coefficients computed from vibration waveforms serve as compact inputs to a fault classifier instead of raw time series.",
    commonDistinction:
      "Creates new derived features versus feature selection, which only removes existing columns without transformation.",
    limitation:
      "Extracted features are harder to interpret than original columns; nonlinear structure may require autoencoders or kernel methods.",
    learnBefore: ["feature", "standardization"],
    learnAfter: ["pca", "embeddings", "autoencoder"],
  },
  pca: {
    coreMeaning:
      "Principal Component Analysis constructs orthogonal directions—principal components—each a linear combination of original features ordered by captured variance. Projection onto the top components yields a lower-dimensional representation.",
    workflowLocation:
      "Applied after continuous features are scaled and before model training when linear dimensionality reduction is appropriate.",
    functionRole:
      "Reduces input dimensionality while preserving the largest variance patterns in the data.",
    mechanism:
      "Data is centered; the covariance matrix eigenvectors (or SVD of the centered matrix) define components. The first component captures maximum variance; subsequent components capture remaining variance orthogonally.",
    equation: eq(
      "Z = X_centered · W_k",
      "Projected data Z equals centered input X multiplied by the matrix W_k of the top k eigenvectors (principal directions).",
      "Each column of W_k is a principal component—a direction of maximum remaining variance. Choosing k trades dimensionality against retained variance.",
      [
        { symbol: "X_centered", meaning: "Input matrix with each feature centered at zero mean" },
        { symbol: "W_k", meaning: "Matrix of the top k eigenvectors (principal components)" },
        { symbol: "Z", meaning: "Reduced-dimensional projection" },
        { symbol: "k", meaning: "Number of components retained" },
      ],
      "Fit PCA on training data only. Nonlinear structure requires kernel PCA, autoencoders, or other nonlinear methods."
    ),
    example:
      "Twenty correlated vibration sensor channels on a factory line are compressed to five components before fault classification.",
    commonDistinction:
      "Feature extraction creating new axes versus feature selection retaining original column names.",
    limitation:
      "Components are linear combinations difficult to interpret; nonlinear relationships require other methods.",
    learnBefore: ["standardization", "feature-extraction"],
    learnAfter: ["embeddings", "autoencoder"],
  },
};
